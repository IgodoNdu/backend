const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routings = require('./routes/route');
const cors = require('cors');


const dotenv = require('dotenv')
dotenv.config();

// mongoose.connect(process.env.DB_CONNECT, () => {
//     console.log('Connected to db successfully');
// });

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(!err){
        console.log('Connected to db successfully');
    }else{
        console.log('Error: Connected to db failed');
    }
});

//for parsing incoming and outgoing requests/responses (bodyParser)
app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

//cors as a middleware
app.use(cors())

//declare middleware
app.use('/app', routings);

app.listen(PORT, () => console.log('Server is up and running'));