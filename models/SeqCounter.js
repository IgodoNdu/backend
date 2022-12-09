const mongoose = require('mongoose');

//schema for sequence counter table
const counterSequenceSchema = mongoose.Schema({
    id: { type: String },
    seq: { type: Number }
});

//model for sequence counter
module.exports = mongoose.model("mySequenceCounter", counterSequenceSchema);