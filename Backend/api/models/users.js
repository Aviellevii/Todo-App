const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    username:{type:String,required:true,unique: true},
    password:{type:String,required:true}
})

module.exports = mongoose.model('Users',UsersSchema);