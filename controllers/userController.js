const express = require('express');
const router = express.Router();

const User = require('../models/userSchema');
const Photo = require('../models/photoSchema')

router.get('/', function(req, res)
{
	User.find({}, function(err, foundUsers)
	{
		if (err) {console.log(err);}
		else
		{
			console.log("GET /users");
			res.render('user/index.ejs', {users: foundUsers});
		}
	});
});

router.get('/new', function(req, res)
{
	console.log("GET /users/new");
	res.render('user/new.ejs');
});

router.post('/', function(req, res)
{
	User.create(req.body, function(err, createdUser)
	{
		if (err) {console.log(err);}
		else
		{
			console.log("Created a new user");
			res.redirect('/users');
		}
	});
});

router.get('/:id', function(req, res)
{
	User.findById(req.params.id, function(err, foundUser)
	{
		if (err) {console.log(err);}
		else
		{
			
			let tempphotos = [];
			foundUser.photos.forEach(function(eachPhotoId)
			{
				Photo.findOne({_id: eachPhotoId}, function(err, foundPhoto)
				{
					tempphotos.push(foundPhoto);
					console.log("pushed a photo into tempphotos");
					if (tempphotos.length == foundUser.photos.length)
					{
						console.log(`GET /users/${req.params.id}`);
						res.render('user/show.ejs', {user: foundUser, photos: tempphotos})
					}
				});
			});
		}
	});
});


router.get('/:id/edit', function(req, res)
{

	User.findById(req.params.id, function(err, userToEdit)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`GET /users/${req.params.id}/edit`);
			res.render('user/edit.ejs', {user: userToEdit});
		}
	});
});

router.put('/:id', function(req, res)
{
	User.findByIdAndUpdate(req.params.id, req.body, function(err, userEdited)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`PUT /users/${req.params.id}`);
			res.redirect('/users');
		}
	});
});


module.exports = router;