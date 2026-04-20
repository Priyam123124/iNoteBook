const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://23051690_db_user:96ZJfcGaj9jQ7QYt@cluster0.9rdlgsa.mongodb.net/iNotebook'

const connectToMongo = ()=>{
    mongoose.connect(mongoURI)
    .then(()=>{
        console.log('Connected To Mongo Succesfully')
    })
}

module.exports = connectToMongo;