const mongoose = require('mongoose')
const mongoURI = 'mongodb://localhost:27017/iNotebook'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log('Connected To Mongo Succesfully')
    })
}

module.exports = connectToMongo;