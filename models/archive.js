const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archiveSchema= new Schema({
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

const Archive = mongoose.model("archive", archiveSchema);// user is the table name here
module.exports = Archive;