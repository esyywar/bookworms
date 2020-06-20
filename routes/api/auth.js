const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const auth = require('../../middleware/auth')

/* Using express validator to check posted user registration info */
const { check, validationResult } = require('express-validator')

/*
 *   @route      GET /api/auth
 *   @desc       Test route
 *   @access     Public
 */
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password')
		res.json({ user })
	} catch (err) {
		res.status(500).send('Server error.')
	}
})

/*
 *   @route      POST /api/auth
 *   @desc       User log in
 *   @access     Public
 */
router.post(
	'/',
	[
		check('email', 'Email is required').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		const errors = validationResult(req)

		/* If errors in validation, throw response */
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}

		const { email, password } = req.body

		try {
			const user = await User.findOne({ email })

			if (!user) {
				return res.status(401).json({ errors: [{ msg: 'Invalid credentials. User not found' }] })
			}

			/* Checking password ... */
			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(401).json({ errors: [{ msg: 'Invalid credentials.' }] })
			}

			/* Payload field for JTW */
			const payload = {
				user: {
					id: user.id,
				},
			}

			/* Create JWT */
			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
				if (err) {
					throw err
				}
				res.json({ msg: `${user.name.split(' ')[0]} is logged in!`, token })
			})
		} catch (err) {
			res.status(500).send('Server error.')
		}
	}
)

module.exports = router
