const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true 
    },
    msg: {
        type: String,
        maxLength: 50
    },
    created_at: {
        type: Date,
        required: true
    }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;