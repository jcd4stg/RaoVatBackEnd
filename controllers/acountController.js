const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Token = require("../models/token");

var privateKey = "*&1huynguyenlyn.vn11nfksnfks";

exports.register = async (req, res) => {

    const { username, password, name, image, email, address, phoneNumber } = req.body;

    const existedUserEmail = await User.findOne({ email, username });

    if (!existedUserEmail) {
        
        const newUser = new User({
            username,
            password,
            name,
            image,
            email,
            address,
            phoneNumber,
            active: true,
            registerDate: Date.now()
        });
        newUser.save()
        .then(() => res.json({kq: 1, errMsg: "User register successfully."}))
        .catch(err => res.json({kq: 0, errMsg: "Mongo save error"}));
    } else {
        res.json({kq: 0, errMsg: "Email/Username is existed"});
    }    
    
    
}

exports.login = async (req, res) => {
    const { username, password } = req.body
    // check username exist
    await User.findOne({ username })
    .then((data) => {
        // findOne chạy ngon lành, không tìm thấy user nào hết
        if (!data) {
            res.json({kq: 0, errMsg: "Username chua dang ki"});
        } else {

            // check password
            bcrypt.compare(password, data.password, (err, resUser) => {
                if (err) {
                    res.json({kq: 0, errMsg: err});
                } else {
                    if (resUser === true) {
                        //login thanh cong
                        jwt.sign({
                            idUser: data._id,
                            username: data.username,
                            name: data.name,
                            image: data.image,
                            address: data.address,
                            phoneNumber: data.phoneNumber,
                            active: data.active,
                            registerDate: data.registerDate,
                            
                        }, privateKey, 
                        {expiresIn: Math.floor(Date.now()/1000) + 60 * 60 * 24 *30}, (err, token) => {
                            if (err) {
                                res.json({kq: 0, errMsg: err});
                            } else {

                                // Save tokens
                                Token.create({
                                    token: token,
                                    user: data._id,
                                    registerDate: Date.now(),
                                    state: true
                                }).then(() => {
                                    res.json({kq: 1, token: token});

                                })
                                .catch(err => {
                                    res.json({kq: 0, errMsg: err});
                                });

                            }
                        });
                    } else {
                        res.json({kq: 0, errMsg: "Sai Password"});
                    }
                }
            })
        }
    })
    .catch((err) => res.json({kq: 0, errMsg: err}));

}


exports.verify = async (req, res) => {
    
    const { token } = req.body;

    await Token.findOne({ token, state: true }).select("_id").lean()
    .then(result => {
        if (!result) {
            res.json({kq: 0, errMsg: "Error Token"});
        } else {

            jwt.verify(token, privateKey, (err, decoded) => {
                if (!err && decoded != undefined) {
                    res.json({kq: 1, user: decoded});
                } else {
                    res.json({kq: 0, errMsg: "Token loi"});
                }
            });
        }
    })
}

exports.logout = async (req, res) => {
    const { token } = req.body;
    await Token.findOneAndUpdate({token}, {state: false})
    .then((result) => {
        if (!result) {
            res.json({kq: 0, errMsg: "Logout err"});
        } else {
            res.json({kq: 1, errMsg: "Logout successfully"});

        }
    })
    .catch(err => {
        res.json({kq: 0, errMsg: err});
    });
}

