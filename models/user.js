const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    password: String,
    name: String,
    image: String,
    email: String,
    address: String,
    phoneNumber: String,
    active: Boolean,
    registerDate: Date
});


UserSchema.pre("save", function(next) {
    if (this.isModified("password")) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(this.password, salt);
        this.password = hashedPassword
    }
    next();
});


module.exports = mongoose.model("User", UserSchema);


