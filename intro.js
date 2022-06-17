const db = require('./models')

const drinkCRUD = async () => {
	try {
		// CREATE
		// step 1: construct new drink
		const newDrink = new db.Drink({
			name: 'Chocolate Milk',
			rating: 10
		})

		// step 2: save it!
		await newDrink.save()

		// READ 
		// finding many
		const foundDrinks = await db.Drink.find({})

		// console.log('found drinks:', foundDrinks)

		// find a single one
		const oneDrink = await db.Drink.findOne({
			rating: 10
		})

		// console.log('oneDrink:', oneDrink)

		// finding by id
		const idFind = await db.Drink.findById(newDrink.id)

		
		// UPDATE
		// updating and saving an instance
		// changing the props here are is not async
		idFind.rating = 11
		await idFind.save() // this is when the new data goes in the db
		
		// console.log('idFind:', idFind)

		// find one and update it
		// checkout findByIdAndUpdate
		// new: true option -- returns the updated value to use after the update
		const updatedOne = await db.Drink.findOneAndUpdate({ name: 'Chocolate Milk' }, { name: 'Strawberry Milk', rating: 2 }, { new: true })
		// console.log('updatedOne:', updatedOne)

		const upserted = await db.Drink.findOneAndUpdate({ name: 'Banana Milk' }, { name: 'Banana Milk', rating: 7 }, { upsert: true, new: true })
		console.log(upserted)
		// DESTROY
		// instance method way
		await upserted.remove() // self destruct

		// model method way
		const deleted = await db.Drink.findOneAndDelete({ name: 'Strawberry Milk' })
		console.log(deleted)
	} catch (err) {
		console.warn('🔥 OH NO!', err)
	}
}

drinkCRUD()