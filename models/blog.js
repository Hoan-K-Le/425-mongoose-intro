const mongoose = require('mongoose')


// comment schema
const CommentSchema = new mongoose.Schema({
	header: String,
	content: String
}, {
	timestamps: true
})

// blog schema
const BlogSchema = new mongoose.Schema({
	title: String,
	body: String,
	// 1:M embedded document
	// 1 blog can have many comments
	comments: [CommentSchema],
	// blog can have one user who made it
	blogger: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

// only export blog schema

module.exports = mongoose.model('Blog', BlogSchema)