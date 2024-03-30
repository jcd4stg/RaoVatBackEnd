const Post = require("../models/post");

exports.add = async (req, res) => { 
    const { tieuDe, gia, dienThoai, image, nhom, noiBan } = req.body;

    await Post.create({
        tieuDe,
        gia,
        dienThoai,
        image,
        nhom,
        noiBan,
        active: true,
        postDate: Date.now()
    })
    .then(() => res.json({kq: 1})) 
    .catch(err => res.json({kq: 0, errMsg: err}));
}

exports.fetchAllCates = async (req, res) => {
    await Post.find()
    .then((listPost) => res.json({kq: 1, listPost: listPost})) 
    .catch(err => res.json({kq: 0, errMsg: err}));
}