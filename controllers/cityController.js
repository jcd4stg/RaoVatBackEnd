
const City = require("../models/city")

exports.list = async (req, res) => {
    res.render("adminMaster", {content: "./city/city.ejs"});

}

exports.add = async (req, res) => {
    const { name } = req.body;
    
    await City.create({
        name
    })
    .then((newCity) => res.json({kq: 1, data: newCity}))
    .catch(err => res.json({kq: 0, errMsg: err}));
    
}

exports.fetchCities = async (req, res) => {
    await City.find()
    .then(list => res.json({kq: 1, list: list}))
    .catch(err => res.json({kq: 0, errMsg: err}));
}

exports.update = async (req, res) => {
    const { _id, name } = req.body;
    await City.findByIdAndUpdate(_id, { name } )
    .then(() => res.json({kq: 1}))
    .catch(err => res.json({kq: 0, errMsg: err})) 
    
}

exports.delete = async (req, res) => {
    const { _id } = req.body;

    await City.findByIdAndDelete(_id)
    .then(() => res.json({kq: 1}))
    .catch(err => res.json({kq: 0, errMsg: err}))
}