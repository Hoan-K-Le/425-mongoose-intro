const db = require('./models')

const commentCrud = async () => {
	try {
		// CREATE
		// make a blog
		const newBlog = await db.Blog.findOneAndUpdate(
			{ title: 'I love Mongoose 🖤' },
			{ body: 'you should really try mongoose, it is great!' },
			{ 
				upsert: true,
				new: true
			}
		)

		console.log('newblog:', newBlog)

		const newComment = {
			header: 'So True 👏',
			content: 'I am in love with mongoose as well!'
		}

		// push it into our blog's array of comments
		newBlog.comments.push(newComment) // not async
		// save the parent document (newBlog)
		await newBlog.save()

		// READ 
		// 62ad09de88941b113c594e0c
		const foundComment = newBlog.comments.id('62ad09de88941b113c594e0c')
		console.log('found a comment:', foundComment)

		// UPDATE
		// modify instance properties
		foundComment.content = '🌈'
		foundComment.header = '🌈🌈🌈🌈🌈🌈🌈'
		// save parent document (is async)
		await newBlog.save()

		// DESTROY
		newBlog.comments[1].remove() // not async
		// save the parent doc (async)
		await newBlog.save()
	} catch (err) {
		console.log(err)
	}
}

// commentCrud()

const userCrud = async () => {
	try {
		// CREATE (associate)
		// create a user
		// const newUser = await db.User.create({
		// 	name: 'Weston'
		// })

		// // find a blog (literally the first blog)
		// const foundBlog = await db.Blog.findOne({})

		// // push the blog into the user's blogs array
		// newUser.blogs.push(foundBlog)

		// // add the user to the blog's blogger field
		// foundBlog.blogger = newUser

		// // save both instances (async)
		// await newUser.save()
		// await foundBlog.save()

		// READ with population
		const foundUser = await db.User.findOne({ name: 'Weston' }).populate('blogs')
		// chain populate if comments were refs too
		// const foundUser = await db.User.findOne({ name: 'Weston' }).populate({
		// 	path: 'blogs',
		// 	populate: {
		// 		path: 'comments'
		// 	}
		// })
		// const foundBlog = await db.Blog.findOne({}).populate('blogger')
		const foundBlog = await db.Blog.findOne({}).populate({
			path: 'blogger',
			populate: {
				path: 'blogs'
			}
		})
		console.log(foundBlog.blogger.blogs)
		// console.log(foundUser)
	} catch (err) {
		console.log(err)
	}
}

userCrud()