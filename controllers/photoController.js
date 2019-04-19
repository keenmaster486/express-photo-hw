const express = require('express');
const router = express.Router();

const Photo = require('../models/photoSchema');
const User = require('../models/userSchema');

router.get('/', function(req, res)
{
	Photo.find({}, function(err, foundPhotos)
	{
		if (err) {console.log(err);}
		else
		{
			console.log("GET /photos");
			res.render('photo/index.ejs', {photos: foundPhotos});
		}
	});
});


router.get('/new', function(req, res)
{
	User.find({}, function(err, foundUsers)
	{
		if (err) {console.log(err);}
		else
		{
			console.log("GET /photos/new");
			res.render('photo/new.ejs', {users: foundUsers});
		}
	});
});

router.post('/', function(req, res)
{
	Photo.create(req.body, function(err, createdPhoto)
	{
		if (err) {console.log(err);}
		else
		{
			User.findById(req.body.userId, function(err, foundUser)
			{
				if (err) {console.log(err);}
				else
				{
					foundUser.photos.push(createdPhoto._id);
					foundUser.save();
					console.log("Created a new photo");
					res.redirect('/photos');
				}
			});
		}
	});
});


router.get('/:id', function(req, res)
{
	Photo.findById(req.params.id, function(err, foundPhoto)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`GET /photos/${req.params.id}`)
			res.render('photo/show.ejs', {photo: foundPhoto});
		}
	});
});

router.delete('/:id', function(req, res)
{
	Photo.findByIdAndDelete(req.params.id, function(err, deletedPhoto)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`DELETE /photos/${req.params.id}`)
			res.redirect('/photos');
		}
	});
});

router.get('/:id/edit', function(req, res)
{

	Photo.findById(req.params.id, function(err, photoToEdit)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`GET /photos/${req.params.id}/edit`);
			res.render('photo/edit.ejs', {photo: photoToEdit});
		}
	});
});

router.put('/:id', function(req, res)
{
	Photo.findByIdAndUpdate(req.params.id, req.body, function(err, photoEdited)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`PUT /photos/${req.params.id}`);
			res.redirect('/photos');
		}
	});
});

module.exports = router;