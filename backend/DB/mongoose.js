const mongoose = require('mongoose');
const mongoDBUrl='mongodb+srv://admin:admin123@insights.zs9zs.mongodb.net/user?retryWrites=true&w=majority';

mongoose.connect(mongoDBUrl,{
    useNewUrlParser: true,
});

