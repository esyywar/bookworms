/* Model for user profile */

const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	company: {
		type: String,
	},
	website: {
		type: String,
	},
	location: {
		type: String,
	},
	language: {
		type: String,
		required: true,
		default: 'English',
	},
	favAuthors: {
		type: [String],
	},
	favBooks: {
		type: [String],
	},
	bio: {
		type: String,
	},
	library: [
		{
			title: {
				type: String,
			},
			author: {
				type: String,
			},
			year: {
				type: String,
			},
			rating: {
				type: Number,
			},
			description: {
				type: String,
			},
		},
	],
	social: {
		youtube: {
			type: String,
		},
		twitter: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		instagram: {
			type: String,
		},
	},
})

module.exports = Profile = mongoose.model('Profile', profileSchema)
