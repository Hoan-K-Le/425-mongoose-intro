// require the mongoose package
const mongoose = require('mongoose')

// define the schema
// new mongoose.Schema({ fields }, { options })
const DrinkSchema = new mongoose.Schema({
	name: {
		type: String
	},
	rating: {
		type: Number
	}
}, {
	timestamps: true
})

// turn the schema into a model and export it
// mongoose.model('ModelName', ModelSchema)
module.exports = mongoose.model('Drink', DrinkSchema)