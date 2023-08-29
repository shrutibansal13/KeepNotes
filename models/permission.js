const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema= new Schema({
    pages:{
        type:String,
        required: true
    }
   
})

const Permission = mongoose.model("permission", permissionSchema);// user is the table name here
module.exports = Permission;