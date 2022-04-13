require("dotenv").config()
const express = require("express")
const router = express.Router()
const User = require("./models/user")
const Courses = require("./models/Course")
const connectDB = require("./DB/mongoose")
const SendOtp = require("./Email Service/email")
const otpGenerator = require("otp-generator")

const otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
  lowerCaseAlphabets: false,
  digits: true,
})

//!Connecting Database
connectDB()

//?Route for Creating a new User
router.post("/register", async (req, res) => {
  //?Creating a new Object of the User model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  try {
    //?Saving data to database
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

//?Route for Logging in a User
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    //?Sending otp to user's email
    SendOtp(user.email, user.name, otp)
    res.status(201).send(user)
  } catch (err) {
    console.log(err.message)
    res.status(400).send(err.message)
  }
})

//!Register user by admin
router.post("/admin/register", async (req, res) => {
  //?Creating a new Object of the creater model
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  })
  try {
    //?Saving data to database
    await user.save()
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err.Error)
  }
})

//!Adding courses to the database having the id of the created attached
router.post("/createcourse", async (req, res) => {
  //?Creating a new Object of the Course model
  const course = new Courses({
    courseName: req.body.courseName,
    price: req.body.price,
    creator_id: req.body.creator_id,
    courseURL: req.body.courseURL,
  })
  try {
    //?Saving data to database
    await course.save()
    res.status(201).send(course)
  } catch (err) {
    res.status(400).send(err)
  }
})

//?Route for enrolling a user to a course
router.post("/addcourse", async (req, res) => {
  //?Creating a new Object of the Course model
  const _id=req.body._id;
  try {
    //?Saving data to database
    await User.findByIdAndUpdate(_id,{$push:{courses:req.body.course_id}})
    res.status(201).send("Course added")
  } catch (err) {
    res.status(400).send(err)
  }
})


//?Get all courses of a particular user or creator
router.get("/courses", async (req, res) => {
  const _id = req.body._id;
  try{
    const userCourses = await Courses.find({creator_id: _id})
    res.send(userCourses)
  }catch(e){
    console.log(e);
    res.status(500).send(e);
  }
})

//? Get a particular course by id
router.get("/course", async (req, res) => {
  const _id = req.body.id;
  try{
    const course = await Courses.find({_id: _id});
    if(!course) return res.status(404).send();
    res.status(200).send(course)
  }catch(e){
    res.status(500).send(e);
  }
})

//?test commit



module.exports = router
