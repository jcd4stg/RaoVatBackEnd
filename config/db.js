const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/AppRaoVat")
    .then(() => console.log("Mongo has connected succesfully"))
    .catch((err) => console.log("MongoDB has not connected succesfully " + err));
}

module.exports = connectDB; 

