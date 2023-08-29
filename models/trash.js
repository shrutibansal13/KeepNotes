const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trashSchema= new Schema({
    notes:{
        type:String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true
    },
    label_id:{
        type:Schema.Types.ObjectId,
        ref:'labels',
    },
    note_id:{
        type:Schema.Types.ObjectId,
        ref:'notes',
    },

   
})

const Trash = mongoose.model("trash", trashSchema);// user is the table name here
module.exports = Trash;