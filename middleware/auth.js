const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
	/* Get jwt token from request */
	const token = req.header('x-auth-token')

	if (!token) {
		return res.status(401).json({ msg: 'No token found, authorization denied.' })
	}

	try {
		/* Verify the token and decode before passing to next */
		const decoded = jwt.verify(token, config.get('jwtSecret'))
		req.user = decoded.user
		next()
	} catch (err) {
		res.status(401).json({ msg: 'Token is not valid.' })
	}
}
