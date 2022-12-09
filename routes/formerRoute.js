//const { request } = require('express');
//const { response } = require('express');
const express = require('express');
const router = express.Router();
const makeEntry = require('../models/SubmitEntry');
//image upload
const multer = require('multer');

const storage = multer.diskStorage({
    // destination: (req, file, callback) => {
    //     //callback(null, '../../public/uploads');
    //     callback(null, process.cwd() + "/uploads/");
    // },
    destination: "uploads",
    filename: (req, file, callback) => {
        //callback(null, file.originalname);
        callback(null, Date.now()+file.originalname);
    }
});

const imgToUpload = multer({storage: storage});

router.post('/entry', imgToUpload.single('pvcImage'), async (req, res) => {
//router.post('/entry', async (req, res) => {
    const newEntry = new makeEntry({
        fullname: req.body.fullname,
        votingState: req.body.votingState,
        age: req.body.age,
        email: req.body.email,
        phone: req.body.phone,
        recipientEmail: req.body.recipientEmail,
        //pvcImage: req.file.pvcImage,
        pvcImage: req.file.filename,
        // pvcImage: {
        //     data: req.file.filename,
        //     contentType: 'image/jpg'
        // }
    });
    const data = await newEntry.save();
        res.json(data);
});

router.get('/entry/get', (req, res) => {
    makeEntry.find((err, data) => {
        if(err) {
            res.status(500).send(err);
        } else{
            res.status(200).send(data);
        }
    })
})

//export the router use
module.exports = router;