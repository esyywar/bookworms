/* Model for posts */

const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user',
	},
	name: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	text: {
		type: String,
		require: true,
	},
	likes: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	comments: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'user',
			},
			name: {
				type: String,
				required: true,
			},
			avatar: {
				type: String,
				required: true,
			},
			text: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				default: Date.now(),
			},
		},
	],
})

module.exports = Post = mongoose.model('Post', postSchema)
