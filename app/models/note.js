const mongoose = require('mongoose')

const Schema = mongoose.Schema 

const noteSchema = new Schema({ 
    title:{
        type:String,
        required:true      
    },
    description:{type:String},
    createdAt: {
        type:Date,
        default: Date.now()
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    color:{
        type:String,
        default: "#555555"
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}) 

const Note = mongoose.model("Note", noteSchema)   

module.exports = Note