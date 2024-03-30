const multer = require("multer");
const { upload } = require("../config/multer");

exports.testUpload =  (req, res) => {
    res.render("testUpload");
}

exports.uploadFile = (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            setTimeout(()=>{
                res.json({kp: 0, errMsg: err});
            }, 3000);
        } else if (err) {

            setTimeout(()=>{
                res.json({kp: 0, errMsg: err});
            }, 3000);
        
        } else {
            setTimeout(() => {
                res.json({kq: 1, urlFile: req.file});

            }, 3000);
        }
    }); 
}




