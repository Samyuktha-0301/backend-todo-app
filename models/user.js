const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        require:true},
    username:{
            type:String,
            unique:true,
            require:true},
    password:{
                type:String,
                require:true},
    list:[{
            type:mongoose.Types.ObjectId,
            ref : "ToDo"},
    ]

    })
    userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });
module.exports = mongoose.model('USER', userSchema)