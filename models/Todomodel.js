const mongoose = require('mongoose')
const todoSchema = new mongoose.Schema({
    text:{
        type:String,
        require:true},
    user:[{
            type:mongoose.Types.ObjectId,
            ref : "USER"},
    ]
    })
    
module.exports = mongoose.model('ToDo', todoSchema)