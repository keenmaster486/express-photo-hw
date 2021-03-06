const mongoose = require('mongoose');

const photoSchema = mongoose.Schema
(
	{
		title: String,
		url: String,
		description: String
	}
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;