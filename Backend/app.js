const express = require('express');
const dotenv =require('dotenv').config();
const app = express();
var cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const TodoRoutes = require('./api/routes/todo');
const UsersRoutes = require('./api/routes/users');
const checkAuth = require('./api/middleware/chekAuth')
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
mongoose.set('strictQuery',false);
mongoose.connect(`${process.env.DATABASE}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

mongoose.connection.on('connected', () => {
    console.log('mongoDB connected');
})

app.use('/todo',checkAuth,TodoRoutes);
app.use('/users',UsersRoutes)

module.exports = app;
