const fs = require('fs')
const express = require('express')
const multer = require('multer')
const path = require('path')

const Image = require('../models/image')
const isAuth = require('../middleware/auth-guard')

const app = express()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

const router = express.Router()

router.post('/add-image', upload.single('image'), async (req, res, next) => {
    var obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname, '../uploads/', req.file.filename)),
            contentType: 'image/jpg'
        }
    }
    try {
        const item = await Image.create(obj)
        await item.save()
        res.status(200).json({ result: item })
    }catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

module.exports = router