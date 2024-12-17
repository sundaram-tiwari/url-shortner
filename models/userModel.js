const { timeStamp } = require('console');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   userName:{
    type:String,
    required:true
   },
   phone:{
    type:Number,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }
}, { timestamps: true })

module.exports = mongoose.model('User',userSchema);
