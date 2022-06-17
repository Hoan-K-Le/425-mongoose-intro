const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	name: String,
	// an array of blogs created by this user
	// reference syntax
	blogs: [{
		// tell mongoose that this is a reference
		type: mongoose.Schema.Types.ObjectId,
		// tell mongoose what model is being referenced
		ref: 'Blog'
	}]
})

module.exports = mongoose.model('User', UserSchema)

