var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    notificationid: String,
    userid: String,
    title: String,
    description: String,
    updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notifications', schema);
