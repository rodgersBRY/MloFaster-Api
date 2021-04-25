const fs = require('fs')
const express = require('express')
const multer = require('multer')
const path = require('path')

const Image = require('../models/image')
const isAuth = require('../middleware/auth-guard')

const app = express()

const router = express.Router()

app.use('/uploads', express.static(__dirname +'/uploads'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + ' - ' + file.originalname)
    }
})

const filter = (req, file, cb) => {
    if (
        file.mimetype.split('/')[1] === "jpeg" || 
        file.mimetype.split('/')[1] === 'jpg' || 
        file.mimetype.split('/')[1] === 'png'
    ) {
      cb(null, true)
    } else {
      cb(new Error("Not an image file"), false)
    }
  };

const upload = multer({ storage: storage, fileFilter: filter })

router.post('/add', isAuth, upload.single('image'), async (req, res, next) => {
    const imageFile = req.file
    if(!imageFile) {
        const error = new Error('Please upload a file')
        error.statusCode = 400
        throw error
    }
    const image = new Image({
        image: imageFile.path
    })
    try {
        const savedImage = await image.save()
        res.status(200).json({ result: savedImage })
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

module.exports = router