const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./db/db');

const photoController = require('./controllers/photoController');
const userController = require('./controllers/userController');

const app = express();



app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

app.use('/photos', photoController);
app.use('/users', userController);



app.listen(3000, function(req, res)
{
	console.log("Server listening on localhost:3000 ");
});