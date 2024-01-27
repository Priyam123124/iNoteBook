const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {
        //"user model" ki object id hmlog store kar rhe hain
        type: mongoose.Schema.Types.ObjectId,
        // ref me hmlog us model ka naam likhte hain jiski object id hame nikalni hai
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        // default: date.now
    },
});

module.exports = mongoose.model('Notes', notesSchema);