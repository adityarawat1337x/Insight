const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password:{
        type: String,
        trim: true,
        minlength: 8,
    },
    role:{
        type: String,
        required: true,
        default: '0'
    },
    courses:[{
        type: ObjectId,
        ref: 'Courses',
    }],
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
},{
    timestamps: true
});

//Encrypting password before saving to database
userSchema.pre('save',async function(next) {
    const user = this;
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password,8);
    next();
});

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({ email: email});
    if(!user) throw new Error('Invaild email!');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invaild password!');
    return user;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token; 
}

const User = mongoose.model('User', userSchema);

module.exports = User;