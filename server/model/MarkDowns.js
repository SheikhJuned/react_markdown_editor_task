const mongoose = require("mongoose");

const markdownSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },

    title: {
        type: String,
    },
    markdown: {
        type: String,

    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("MarkDowns", markdownSchema);
