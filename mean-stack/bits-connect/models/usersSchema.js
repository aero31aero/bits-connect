var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    username: String,
    bitsid: String,
    password: String,
    isprivate: Boolean,
    note: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Users', usersSchema);