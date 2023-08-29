const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notifcationSchema= new Schema({
    notification:{
        type:String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true
    }
   
})

const Permission = mongoose.model("notification", notifcationSchema);// user is the table name here
module.exports = Permission;