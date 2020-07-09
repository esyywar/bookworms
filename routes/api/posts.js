const express = require('express')

/* For JWT authorization */
const auth = require('../../middleware/auth')

/* Using express validator to check posted user registration info */
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const { remove } = require('../../models/Post')

const router = express.Router()

/*************** GET REQUESTS *****************/

/*
 *   @route      GET /api/posts
 *   @desc       get all posts
 *   @access     Public
 */
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find()
		res.json(posts)
	} catch (error) {
		res.status(500).send('Server error.')
	}
})

/*
 *   @route      GET /api/posts/:id
 *   @desc       get specific post
 *   @access     Public
 */
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(400).json({ msg: 'Post was not found.' })
		}

		res.json(post)
	} catch (error) {
		if (error.kind === 'ObjectId') {
			return res.status(400).send('Post was not found.')
		}
		res.status(500).send('Server error.')
	}
})

/*************** POST REQUESTS *****************/

/*
 *   @route      POST /api/posts
 *   @desc       Create a post
 *   @access     Private
 */
router.post(
	'/',
	[auth, check('text', 'Post content is required.').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req)

		/* If errors in validation, throw response */
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		try {
			const user = await User.findById(req.user.id).select('-password')

			const newPost = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			}

			post = new Post(newPost)

			await post.save()

			res.json({ msg: 'Post has been published!' })
		} catch (error) {
			res.status(500).send('Server error.')
		}
	}
)

/*
 *   @route      POST /api/posts/:id
 *   @desc       Comment on a post
 *   @access     Private
 */
router.post(
	'/:id',
	[auth, check('text', 'Comment content is required.').not().isEmpty()],
	async (req, res) => {
		const errors = validationResult(req)

		/* If errors in validation, throw response */
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		try {
			const user = await User.findById(req.user.id)

			const post = await Post.findById(req.params.id)

			if (!post) {
				return res.status(400).json({ msg: 'Post was not found.' })
			}

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			}

			post.comments.unshift(newComment)

			await post.save()

			res.json(post.comments)
		} catch (error) {
			res.status(500).send('Server error.')
		}
	}
)

/**************** PUT REQUESTS ****************/

/*
 *   @route      PUT /api/posts/like/:id
 *   @desc       Toggle like of a post
 *   @access     Private
 */
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(400).json({ msg: 'Post was not found.' })
		}

		/* Check if user has already liked the post */
		if (post.likes.filter((likes) => likes.user.toString() === req.user.id).length > 0) {
			const removeIndex = post.likes.map((likes) => likes.user.toString()).indexOf(req.user.id)
			post.likes.splice(removeIndex, 1)

			var msg = 'Unliked post!'
		} else {
			post.likes.unshift({ user: req.user.id })

			var msg = 'Liked post!'
		}

		await post.save()

		res.json({ post, msg })
	} catch (error) {
		res.status(500).send('Server error.')
	}
})

/*
 *   @route      PUT /api/posts/unlike/:id
 *   @desc       Unlike a post
 *   @access     Private
 */
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(400).json({ msg: 'Post was not found.' })
		}

		/* Check if user has already liked the post */
		if (post.likes.filter((likes) => likes.user.toString() === req.user.id).length === 0) {
			return res.status(400).json({ msg: 'Cannot unlike a post that has not been liked!' })
		}

		const removeIndex = post.likes.map((likes) => likes.user.toString()).indexOf(req.user.id)

		post.likes.splice(removeIndex, 1)

		await post.save()

		res.json(post.likes)
	} catch (error) {
		res.status(500).send('Server error.')
	}
})

/**************** DELETE REQUESTS ****************/

/*
 *   @route      DELETE /api/posts/:id
 *   @desc       Delete a user's post
 *   @access     Private
 */
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) {
			return res.status(400).json({ msg: 'Post was not found.' })
		}

		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'You do not have permission to delete this post.' })
		}

		await post.remove()

		const msg = 'Post has been deleted'

		res.json(msg)
	} catch (error) {
		if (error.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Post was not found.' })
		}
		res.status(500).send('Server error.')
	}
})

/*
 *   @route      DELETE /api/posts/:id/:comment_id
 *   @desc       Delete a comment from a post
 *   @access     Private
 */
router.delete('/:post_id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.post_id)

		if (!post) {
			return res.status(400).json({ msg: 'Post was not found' })
		}

		const comment = post.comments.find(
			(comment) => comment._id.toString() === req.params.comment_id
		)

		/* Check if comment exists */
		if (!comment) {
			return res.status(401).json({ msg: 'Comment was not found.' })
		}

		/* Is request from user who made the comment? */
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'You do not have permission to delete this comment.' })
		}

		const removeIndex = post.comments
			.map((comment) => comment.id.toString())
			.indexOf(req.params.comment_id)

		post.comments.splice(removeIndex, 1)

		await post.save()

		res.json(post)
	} catch (error) {
		res.status(500).send('Server error.')
	}
})

module.exports = router
