const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notesSchema= new Schema({
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
        ref:'labels'
    }
   
})

const Notes = mongoose.model("note", notesSchema);// user is the table name here
module.exports = Notes;