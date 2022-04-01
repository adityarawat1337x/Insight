const express = require('express');
const router = express.Router();
const User = require('./models/user');
const Courses = require('./models/Course');
const connectDB = require('./DB/mongoose');
const SendOtp = require('./Email Service/email');
const otpGenerator = require('otp-generator');
const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });

//!Connecting Database
connectDB();

//?Route for Creating a new User
router.post('/register',async(req,res) => {
    //?Creating a new Object of the User model
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    try{
        //?Saving data to database
        await user.save();
        //?generating authentication token
        await user.generateAuthToken();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

//?Route for Logging in a User
router.post('/login',async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password);
        //?generating authentication token
        const token = await user.generateAuthToken();
        //?Sending otp to user's email
        SendOtp(user.email,user.name,otp);
        res.status(201).send(user);
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }
})


router.post('/admin/register',async(req,res) => {
    //?Creating a new Object of the creater model
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    });
    try{
        //?Saving data to database
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

//!Adding courses to the database having the id of the created attached
router.post('/addcourse',async (req,res) => {
    //?Creating a new Object of the Course model
    const course = new Courses({
        courseName: req.body.courseName,
        price: req.body.price,
        creater_id : req.body.creater_id,
    })
    try{
        //?Saving data to database
        await course.save();
        res.status(201).send(course);
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;