const Category = require("../models/category");


exports.renderCategory = async (req, res) => {
    res.render("adminMaster", {content: "./category/category.ejs"});
}

exports.addNew = async (req, res) => {

    const { name, image } = req.body;

    await Category.create({
        name,
        image
    })
    .then((newCate) => {
        res.json({kq: 1, data: newCate});

    })
    .catch(err => res.json({kq: 0, errMsg: err}));
}

exports.fetchCates = async (req, res) => {
    await Category.find()
    .then((data) => res.json({kq: 1, cateList: data}))
    .catch(err => res.json({kq: 0, errMsg: err}));
}

exports.update = async (req, res) => {
    const { _id, name, image } = req.body;
    await Category.findByIdAndUpdate(_id, {
        name,
        image
    })
    .then(() => res.json({kq: 1}))
    .catch(err => res.json({kq: 0, errMsg: err}));
}

exports.delete = async (req, res) => {
    const { _id } = req.body;
    await Category.findOneAndDelete(_id)
    .then(() => res.json({kq: 1}))
    .catch(err => res.json({kq: 0, errMsg: err}));
}