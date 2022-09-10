const mongoose = require('mongoose');
const cities = require('./cities');
//importação dos valores de seedHelper
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground'); //requisição do modelo


mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//Passa uma array como parametro e retorna um valor aleatório dessa array
const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i=0; i<200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author:'631272f5692eddc1c2417ce6',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus minima, exercitationem sit soluta corrupti animi molestiae aspernatur eaque, accusamus, id veritatis eveniet nihil delectus? Corrupti laboriosam voluptate dolorum id nam.',
            price,
            geometry: {
                "type": "Point", 
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dpo4xktql/image/upload/v1662646171/sample.jpg',
                  filename: 'sample',                  
                },
                {
                  url: 'https://res.cloudinary.com/dpo4xktql/image/upload/v1662646171/sample.jpg',
                  filename: 'sample',                  
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});