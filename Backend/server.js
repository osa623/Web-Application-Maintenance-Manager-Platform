const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json())

const URL = process.env.MONGODB_URL; 

mongoose.connect(URL, {
    //useCreateIndex: true,
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: true
});

const connection = mongoose.connection;
connection.once("open",() => {

    console.log("Mongodb Connection Success!");

});

app.listen(PORT, () => {

console.log("Server is up and running on port")

});

const formRouter = require("./routes/Form.js");
app.use("/Form",formRouter);

const fundRouter = require('./routes/fund.js');
app.use('/Fund', fundRouter);

const invoiceRoutes = require('./routes/receipt');
app.use('/Receipts', invoiceRoutes);

const invoicepdf = require('./routes/filepdf');
app.use('/Invoices', invoicepdf);

const requestform = require('./routes/requestForm');
app.use('/requestforms', requestform);

const donationForm = require('./routes/DonationForm');
app.use('/donationforms', donationForm);

const authfunction = require('./routes/auth.js');
app.use('/authentication', authfunction);


//const adoptionfundRoute = require('./routes/adoptionfund');
//app.use('/adoptionfund', adoptionfundRoute);

//const donationfundRoute = require('./routes/donationfund');
//app.use('/donationfund', donationfundRoute);