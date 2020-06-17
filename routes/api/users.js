const express = require('express')
const router = express.Router()

/* Using express validator to check posted user registration info */
const { check, validationResult } = require('express-validator')

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
	(req, res) => {
		const errors = validationResult(req)

		/* If errors in validation, throw response */
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() })
		}

		/* Registering user ... */
		const { name, email, password } = req.body

		console.log(req.body)
		res.send('User created')
	}
)

module.exports = router
