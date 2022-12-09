const mongoose = require('mongoose');

//ceating the schema
//const submitEntrySchema = new mongoose.Schema({
const submitEntrySchema = mongoose.Schema({
    raffleNo: {
        type: Number,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    firstName: {
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
    // recipientEmail: {
    //     type: String,
    //     required: true
    // },
    myRefCode: {
        type: String,
        required: true
    },
    refferedBy: {
        type: String,
        //required: true
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

module.exports = mongoose.model("myPVCtableCollectionUpdate", submitEntrySchema);