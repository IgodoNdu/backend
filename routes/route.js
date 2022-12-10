//const { request } = require('express');
//const { response } = require('express');
const express = require('express');
const router = express.Router();
const makeEntry = require('../models/SubmitEntry');
//model for sequence counter
const seqCounter = require('../models/SeqCounter');
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
    seqCounter.findOneAndUpdate(
        {id: "autoval"},
        {"$inc": {"seq":1}},
        {new:true},
        (err,returnedData) => {
            //variable to hold seq val
            let seqVal;
            if(returnedData == null) {
                const newVal = new SeqCounter({id:"autoval", seq:1})
                newVal.save();
                //on first run
                seqVal = 1;
            } else{
                //hold the value of the current sequence count
                seqVal = returnedData.seq;
            }

            // const newEntry = new makeEntry({
            //     raffleNo: seqVal,
            //     fullname: req.body.fullname,
            //     votingState: req.body.votingState,
            //     age: req.body.age,
            //     email: req.body.email,
            //     phone: req.body.phone,
            //     recipientEmail: req.body.recipientEmail,
            //     //pvcImage: req.file.filename,
            // });


            //check if phone No already exists
            const PhoneNo = req.body.phone;
            // console.log(PhoneNo);
            // const userPhoneNo = makeEntry.findOne({ phone: PhoneNo });
            // if(userPhoneNo) {
                
            //     res.json({ error: "User detail already exists" })
            // }else{
            //     const data = newEntry.save();
            //     res.json(data);
            // }
            // const data = newEntry.save();
            //     res.json(data);

            //****Another Way */
            makeEntry.findOne({ phone: req.body.phone }, function(err, existingUser){
                if(existingUser == null){
                    const newEntry = new makeEntry({
                        raffleNo: seqVal,
                        myRefCode: seqVal,
                        firstName: req.body.firstName,
                        middleName: req.body.middleName,
                        lastName: req.body.lastName,
                        votingState: req.body.votingState,
                        age: req.body.age,
                        refferedBy: req.body.refferedBy,
                        phone: req.body.phone,
                        pvcImage: req.file.filename,
                    });

                    const data = newEntry.save();
                    res.json(data);
                } else{
                    res.json({ err: "User detail already exists" })
                }
            });
            
        }
    )

//router.post('/entry', async (req, res) => {
    // const newEntry = new makeEntry({
    //     fullname: req.body.fullname,
    //     votingState: req.body.votingState,
    //     age: req.body.age,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     recipientEmail: req.body.recipientEmail,
    //     //pvcImage: req.file.pvcImage,
    //     pvcImage: req.file.filename,
    //     // pvcImage: {
    //     //     data: req.file.filename,
    //     //     contentType: 'image/jpg'
    //     // }
    // });
    // const data = await newEntry.save();
    //     res.json(data);
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

router.get('/entry/get/:phoneNumber', (req, res) => {
    const numberFetch = req.params.phoneNumber
    makeEntry.find({ phone: numberFetch }, function(err, data){
        if(err) {
            res.status(500).send(err);
        } else{
            if(data.length == 0){
                res.send("Data not found");
            }else{
                res.status(200).send(data);
                console.log(data);
            }
        }
    })
})

//export the router use
module.exports = router;