const mongoose = require('mongoose');
const mongoDBUrl='mongodb+srv://admin:admin123@insights.zs9zs.mongodb.net/user?retryWrites=true&w=majority';
var colors = require('colors');

const connectDB= async () => {
    try{
        const conn = await mongoose.connect(mongoDBUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.green.inverse)
    } catch (error) {
        console.error(`${error}`.red.inverse)
;        process.exit(1)
    }
}

module.exports = connectDB;