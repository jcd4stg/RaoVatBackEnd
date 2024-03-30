const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    tieuDe: String,
    gia: String,
    dienThoai: String,
    image: String,
    nhom: String,
    noiBan: String,
    active: Boolean,
    postDate: Date
});

module.exports = mongoose.model("Post", PostSchema);