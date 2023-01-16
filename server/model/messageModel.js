const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    Chatusers: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    Sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true,
})
module.exports = mongoose.model("Message", MessageSchema);