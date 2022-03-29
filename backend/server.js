const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./index');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(router);

//Starting Server 
app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});
