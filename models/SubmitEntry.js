const mongoose = require('mongoose');

//ceating the schema
//const submitEntrySchema = new mongoose.Schema({
const submitEntrySchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    votingState: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    recipientEmail: {
        type: String,
        required: true
    },
    pvcImage: {
        //data: Buffer,
        //contentType: String,
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("myPVCtableCollection", submitEntrySchema);