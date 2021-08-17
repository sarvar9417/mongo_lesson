const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('MongoDb ga ulanish hosil qilindi'))
    .catch((err)=>console.log(`MongoDb ga ulanishda xato yuz berdi ${err}`))

const laptopSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: 3, maxlength: 30, trim: true/*old va orqadadi probellarni oib tashlaydi*/},
    cpu: String,
    rom: Number,
    ram: Number,
    color: String,
    price: {type: Number, min: 250, max: 10000},
    date: {type: Date, default: Date.now}
})

const Laptop = mongoose.model('Laptop', laptopSchema)

async function createLaptop() {
    const laptop = new Laptop({
        name: "Macbook Air",
        cpu: "M1",
        rom: 256,
        ram: 8,
        color: "Gray",
        price: 899
    })

    const saveLaptop = await laptop.save()
    console.log(saveLaptop)
}

async function getLaptop() {
    const pageNumber = 3
    const pageSize = 10
    // /api/laptops/pageNumber=3&pageSize=10 -> bo'lib ma'lumot keladi
    const laptop = await Laptop
        .find()
        .skip((pageNumber-1) * pageSize) // Pagination -> yashash - pagelar sonini hosil qilish
        .limit(10) // har bir pageda nechta elementni ko'rsatish
        //.find({name: /^M/}) // M harfi bilan boshlanadigan nameli laptoplarni qaytaradi
        // .find({name: /Pro$/}) // Pro so'zi bilan tugagan nomli laptoplarni qidiradi
        // .find({name: /Pro$/i}) // Pro so'zi bilan tugagan nomli laptoplarni qidiradi(registr farqlamaydi)
        // .find({name: /.*book.*/}) // orasida ...book... soz'zi qatnashgan nomli laptoplarni qaytaradi.
        // .find({price: {$gt: 900}} // solishtiruv operatorlari
        // eq -> =, ne -> !=, gt -> >, gte -> >=, it -> <, ite -> <= // bular oldidan $ belgisi qo'yoladi
        // .countDocuments()// Nechta ma'lumot topilganini hisobla qaytarib beruvchi funksiya
        // .or({color:"Gray"},{ram: 16})// ikkala shartdan kamida bittasi rostlarini qaytaradi
        // .limit(1) //nechta obyektni olish kerakligini ko'rsatish
        // .sort({cpu: 1}) // sort(1) or sort (-1) -> o'sish yoki kamayish tartibida saralash
        // .select({name: 0}) // (argument: 0) - argumentdan boshqa hammasini olish, (argument2: 1, argument2: 1 ) - argumentlarni olish
        //

    console.log(laptop)
}

async function updateLaptop(id) {
    const laptop = await Laptop.findById(id)
    if(!laptop) return
    laptop.ram = 1024
    laptop.cpu = "Intel"
    const update = await laptop.save()
    console.log(update)
}

async function updateLaptop2(id) {
    const result = await Laptop.update({_id: id}, {
        $set: {
            name: "Asus",
        }
    })

    console.log(result)
}

async function deleteLaptop(id) {
    const result = await Laptop.deleteOne({_id: id})
    console.log(result)
}

async function deleteLaptop2(id) {
    const result = await Laptop.findByIdAndRemove({_id: id})
    console.log(result)
}


//deleteLaptop2("61018fbeffd703377c6b1d27")
//deleteLaptop("61018fc887dce033181f326b")
//updateLaptop2("61018fc887dce033181f326b")
//updateLaptop("61018fc887dce033181f326b")
//getLaptop()
//createLaptop()