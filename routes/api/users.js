const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

/* Using express validator to check posted user registration info */
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

/*
 *   @route      GET /api/users
 *   @desc       Register user
 *   @access     Public
 */
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter password with at least 6 characters').isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req)

		/* If errors in validation, throw response */
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}

		/* Registering user ... */
		const { name, email, password } = req.body

		try {
			let user = await User.findOne({ email })

			if (user) {
				return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
			}

			/* Generate user avatar */
			const avatar = gravatar.url(email, { s: '200', r: 'x', d: 'mm' })

			user = new User({ name, email, avatar, password })

			/* Encrypt password in db */
			var salt = await bcrypt.genSaltSync(10)
			user.password = await bcrypt.hashSync(password, salt)

			await user.save((err, user) => {
				res.send('User registered!')
			})
		} catch (err) {
			console.log(err.message)
			res.status(500).send('Server error')
		}
	}
)

module.exports = router
