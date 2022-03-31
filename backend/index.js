const express = require('express');
const router = express.Router();
const User = require('./models/user');
const Courses = require('./models/Course');
const connectDB = require('./DB/mongoose');

connectDB();

//Route for Creating a new User
router.post('/register',async(req,res) => {
    //Creating a new Object of the User model
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    });
    try{
        //Saving data to MongoDB
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})

router.post('/admin/register',async(req,res) => {
    //Creating a new Object of the User model
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
    });
    try{
        //Saving data to MongoDB
        await user.save();
        res.status(201).send(user);
    }catch(err){
        res.status(400).send(err);
    }
})



router.post('/addcourse',async (req,res) => {
    console.log(req.body);
    const course = new Courses({
        courseName: req.body.courseName,
        price: req.body.price,
        creater_id : req.body.creater_id,
    })
    try{
        await course.save();
        res.status(201).send(course);
    }catch(err){
        res.status(400).send(err);
    }
})

module.exports = router;