const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'docs/',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.originalname)
    }
})

const uploader = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const supportedImage = /pdf|doc/;
        const extension = path.extname(file.originalname);

        if (supportedImage.test(extension)) {
            cb(null, true)
        } else {
            cb(new Error('Must be a pdf or doc document'))
        }
    },

    limits: {
        fieldSize: 5000000,
    }

});

module.exports = uploader;