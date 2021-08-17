const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser:true, useUnifiedTopology:true})

const sizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
})
const inventorySchema = new mongoose.Schema({
    item: String,
    qty: Number,
    size: sizeSchema,
    status: String
}, {collection: 'inventory'})

const Inventory = mongoose.model('Inventory', inventorySchema)

async function getInventory() {
    return await Inventory
        .find()
        .or([{qty: {$lte:50}},{item: /.*l.*/i}])
        .sort({qty: -1})
}

async function run(){
    const result = await getInventory()
    console.log(result)
}

run()

