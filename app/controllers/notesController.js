const Note = require('../models/note')
const Category = require('../models/category')


//get
module.exports.list = (req,res)=>{ 
    Note.find({user: req.user._id}).populate('categoryId') 
    .then((notes)=>{
         res.json(notes)
    })
    .catch((err)=>{
        res.json(err)
    })
}
 
//post
module.exports.create = (req,res)=>{                 
    const body = req.body  
    const note = new Note(body) 
    note.user = req.user._id
    note.populate("categoryId").execPopulate()
    note.save()  
        .then((note)=>{
            res.json(note)  
        })
        .catch((err)=>{
            res.json(err)
        })
}
 
//get 
module.exports.show = (req,res)=>{
    const id = req.params.id
    Note.findOne({_id: id, user:req.user._id}).populate('categoryId')    //'categoryId', ['_id', "name"]      //it only send back the properties inside the array
        .then((note)=>{
            if(note){
                // Category.findOne({_id: note.categoryId}) 
                //     .then(category=>{
                //         console.log(category)
                //         note.categoryId = category
                //         return res.json(note)
                //     })
                //     .catch(err => res.json(err))
                res.json(note)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//delete
module.exports.destroy = (req,res)=>{
    const id = req.params.id
    Note.findOneAndDelete({_id: id, user:req.user._id})
        .then((note)=>{
            if(note){
                res.json(note)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}

//put
module.exports.update = (req,res)=>{
    const id = req.params.id
    const body = req.body
    Note.findOneAndUpdate({_id: id, user:req.user._id}, body, {new:true, runValidators : true}).populate('categoryId') 
        .then((note)=>{
            if(note){
                res.json(note)
            }else{
                res.json({})
            }
        })
        .catch((err)=>{
            res.json(err)
        })
}