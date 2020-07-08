const express = require('express')

/* For JWT authorization */
const auth = require('../../middleware/auth')

/* Using express validator to check posted user registration info */
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

const router = express.Router()

/*********************** GET REQUESTS ************************/

/*
 *   @route      GET /api/profile/me
 *   @desc       Get current user's profile
 *   @access     Private
 */
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
			'name',
			'avatar',
		])

		if (!profile) {
			return res.status(400).json({ msg: 'No profile found for this user.' })
		}

		res.json(profile)
	} catch (err) {
		res.status(500).send('Server error.')
	}
})

/*
 *   @route      GET /api/profile
 *   @desc       Get all profiles
 *   @access     Public
 */
router.get('/', async (req, res) => {
	try {
		const profile = await Profile.find().populate('user', ['name', 'avatar'])
		res.json(profile)
	} catch (error) {
		res.status(500).send('Server error.')
	}
})

/*
 *   @route      GET /api/profile/user/:user_id
 *   @desc       Get profile for specified user
 *   @access     Public
 */
router.get('/user/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [
			'name',
			'avatar',
		])

		if (!profile) {
			return res.status(400).json({ msg: 'User profile not found.' })
		}

		res.json(profile)
	} catch (error) {
		/* Check if error resulted from user not being found */
		if (err.kind == 'ObjectId') {
			return res.status(400).send('User profile not found.')
		}
		res.status(500).send('Server error.')
	}
})

/*********************** POST REQUESTS ************************/

/*
 *   @route      POST /api/profile
 *   @desc       Create or update user profile
 *   @access     Private
 */
router.post(
	'/',
	[
		auth,
		check('name', 'Name is required.').not().isEmpty(),
		check('language', 'Language is required.').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req)

		/* If errors in validation, throw response */
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		/* Build profile object */
		const {
			name,
			avatar,
			date,
			company,
			website,
			location,
			language,
			favAuthors,
			favBooks,
			bio,
			pastReads,
			library,
			youtube,
			twitter,
			linkedin,
			instagram,
		} = req.body

		/* Populate profile fields with provided data */
		const profileFields = {}
		profileFields.user = req.user.id
		if (name) profileFields.name = name
		if (avatar) profileFields.avatar = avatar
		if (date) profileFields.date = date
		if (company) profileFields.company = company
		if (website) profileFields.website = website
		if (location) profileFields.location = location
		if (language) profileFields.language = language
		if (favAuthors)
			profileFields.favAuthors = favAuthors.split(',').map((element) => element.trim())
		if (favBooks) profileFields.favBooks = favBooks.split(',').map((element) => element.trim())
		if (bio) profileFields.bio = bio
		if (pastReads) profileFields.pastReads = pastReads
		if (library) profileFields.library = library

		profileFields.social = {}
		if (youtube) profileFields.social.youtube = youtube
		if (twitter) profileFields.social.twitter = twitter
		if (linkedin) profileFields.social.linkedin = linkedin
		if (instagram) profileFields.social.instagram = instagram

		try {
			let profile = await Profile.findOne({ user: req.user.id })

			if (profile) {
				/* Find and update user profile */
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				)

				return res.json({ msg: 'Profile successfully edited!', profile })
			}

			profile = new Profile(profileFields)

			await profile.save()

			res.json({ msg: 'Profile successfuly created!', profile })
		} catch (err) {
			res.status(500).send('Server error.')
		}
	}
)

/*********************** PUT REQUESTS ************************/

/*
 *   @route      PUT /api/profile/library
 *   @desc       Add new book to user's library
 *   @access     Private
 */
router.put(
	'/library',
	[
		auth,
		check('title', 'Title is required.').not().isEmpty(),
		check('author', 'Author is required.').not().isEmpty(),
		check('year', 'Year is required.').isNumeric(),
		check('rating', 'Rating (between 0 - 10) is required.').isNumeric(),
	],
	async (req, res) => {
		const errors = validationResult(req)

		/* If errors in validation, throw response */
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() })
		}

		const { title, author, year, rating, description } = req.body

		if (!(rating >= 0 && rating <= 10)) {
			return res.status(401).json({ msg: 'Rating invalid (must be 1 -10).' })
		}

		const newBook = { title, author, year, rating, description }

		try {
			/* Find user's profile */
			const profile = await Profile.findOne({ user: req.user.id })

			if (profile.library.some((element) => element.title == newBook.title)) {
				return res.status(406).json({ errors: { msg: 'This book is already in your library!' } })
			}

			profile.library.unshift(newBook)

			await profile.save()

			res.json(profile.library)
		} catch (error) {
			res.status(500).send('Server error.')
		}
	}
)

/*********************** DELETE REQUESTS ************************/

/*
 *   @route      DELETE /api/profile
 *   @desc       Delete the user's profile, posts and account
 *   @access     Private
 */
router.delete('/', auth, async (req, res) => {
	try {
		/* TODO - Delete user's posts */

		/* Delete the user's profile */
		await Profile.findOneAndDelete({ user: req.user.id })

		/* Delete the user's account */
		await User.findOneAndDelete({ _id: req.user.id })

		res.json({ msg: `Account has been deleted.` })
	} catch (error) {
		res.status(500).send('Server error.')
	}
})

/*
 *   @route      DELETE /api/profile/me
 *   @desc       Remove book from user's library
 *   @access     Private
 */
router.delete('/library/:lib_id', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id })

		const removeIndex = profile.library.map((book) => book._id).indexOf(req.params.lib_id)

		profile.library.splice(removeIndex, 1)

		await profile.save()

		res.json({ msg: 'Book removed from library.' })
	} catch (error) {
		res.status(400).send('Server error.')
	}
})

module.exports = router
