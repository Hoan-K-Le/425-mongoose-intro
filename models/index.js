// require the mongoose package
const mongoose = require('mongoose')

// tell mongoose to connect to the mongo URI
const uri = 'mongodb://127.0.0.1/introPractice425'
mongoose.connect(uri, {
	// useNewUrlParser: true
})

// use some db connection methods for console logs (debug)
const db = mongoose.connection

// success 
db.once('open', () => {
	console.log(`🔗 mongoDB connection @ ${db.host}:${db.port}`)
})

// failure
db.on('error', err => {
	console.warn('🔥 The Datacenter has burned to the ground', err)
})

// export all of our models from this file
module.exports = {
	Drink: require('./drink'), 
	Blog: require('./blog')
}