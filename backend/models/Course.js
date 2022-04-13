const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const courseSchema = new Schema({
    courseName:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    courseURL:{
        type: String,
        required: true,
        unique: true,
    },
    creator_id:{
        type: ObjectId, 
        ref: 'User',
    }
},{
    timestamps: true,
})

const Courses = mongoose.model('Courses', courseSchema);

module.exports = Courses;