const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
    token: String,
    user: mongoose.SchemaTypes.ObjectId,
    registerDate: Date,
    state: Boolean
});

module.exports = mongoose.model("Token", TokenSchema);