const config = require('config');
//const routes = require('./routes');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const packagesRoute = require('./routes/packagesRoute');
const userInfoRoute = require('./routes/userInfoRoute');
const express = require('express');
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined...');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/sendIT-demo', {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('Sucessfully connected to MongoDB....'))
    .catch(err => console.log('Error while connecting....', err));


app.use(express.json());
//app.use('./', routes);
app.use('/api/packages', packagesRoute);
app.use('/api/users', userInfoRoute);
app.use('/api/auth',  auth);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Processing on port ${port}....`));