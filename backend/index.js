const express = require('express');
const router = express.Router();
const User = require('./models/user');
require('./DB/mongoose');

//Route for Creating a new User
router.post('/signup',async(req,res) => {
    //Creating a new Object of the User model
    const user = new User({
        name: req.body.name,
        email: req.body.email,
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

module.exports = router;