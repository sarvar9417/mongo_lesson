const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test', {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=>console.log('MongoDbga ulanish hosil qilindi'))
    .catch(err=>console.log(`MongoDB ga ulanishda xatolik yuz berdi ${err}`))

const sizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
})
const inventorSchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: sizeSchema,
    status: String
}, {collection: 'inventory'})

const Inventor = mongoose.model('Inventor', inventorSchema)

async function getInventor() {
    return await Inventor
        .find({status: 'A'})
        .sort({item: 1})
        .select({item: 1, qty: 1, _id: 0})
}

async function run() {
    const result = await getInventor()
    console.log(result)
}

run()

