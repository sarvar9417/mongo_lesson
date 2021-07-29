const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log('MongoDb ga ulanish hosil qilindi'))
    .catch((err)=>console.log(`MongoDb ga ulanishda xato yuz berdi ${err}`))

const laptopSchema = new mongoose.Schema({
    name: String,
    cpu: String,
    rom: Number,
    ram: Number,
    color: String,
    price: Number,
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

getLaptop()
//createLaptop()