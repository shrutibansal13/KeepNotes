const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelSchema= new Schema({
    labels:{
        type:String,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'users',
        required: true
    }
   
})

const Labels = mongoose.model("label", labelSchema);// user is the table name here
module.exports = Labels;