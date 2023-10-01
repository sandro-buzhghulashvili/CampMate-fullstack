const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/hunt-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", ()=> {
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)]



const seedDB = async () => {
    await Campground.deleteMany({})
    for(let i = 0; i < 50; i++) {
        const random20 = Math.floor(Math.random() * 50) + 1
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author : '625074d95294004cac04c522',
            location:`${cities[random20].city}, ${cities[random20].admin_name}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro earum voluptatum perferendis itaque, quam quas optio odit animi quia illum odio doloribus repudiandae suscipit? Et dolore nesciunt fuga architecto ab?',
            price,
            geometry: {
                type:"Point",
                coordinates: [
                cities[random20].lng,
                cities[random20].lat
            ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/campnet12/image/upload/v1649874247/folder1/eoarc52cd527fmdfg3ul.jpg',
                  filename: 'folder1/eoarc52cd527fmdfg3ul',
                }, 
                {
                  url: 'https://res.cloudinary.com/campnet12/image/upload/v1650018002/folder1/qt0coavlz17fyoraq0fu.jpg',
                  ilename: 'folder1/qt0coavlz17fyoraq0fu',
                }
              
                ],
        })
        await camp.save()
    }
}

seedDB().then(()=> {
    mongoose.connection.close()
})