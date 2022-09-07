const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    completed:{type:Boolean,default:false},
    _userId:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})

module.exports = mongoose.model('Todo',todoSchema);