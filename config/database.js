//connect express to mongoDb via mongoose

const mongoose = require('mongoose')

const connectToDb =()=>{
    mongoose.connect('mongodb://localhost:27017/july-notes-app', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })      
        .then(()=>{ 
            console.log('connected to db')
        })
        .catch((err)=>{
            console.log(err)
        })
}

module.exports = connectToDb