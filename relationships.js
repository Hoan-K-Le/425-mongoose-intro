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

		// DESTROY
	} catch (err) {
		console.log(err)
	}
}

commentCrud()