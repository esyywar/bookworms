import React, { useState } from 'react'

import Container from 'react-bootstrap/Container'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Login() {
	const initialState = { emailAddr: '', password: '' }
	const [formEntries, setFormEntries] = useState(initialState)

	const axios = require('axios')

	function handleInputChange(e) {
		setFormEntries({ ...formEntries, [e.target.name]: e.target.value })
	}

	async function handleSubmit(e) {
		e.preventDefault()

		const loginCreds = { email: formEntries.emailAddr, password: formEntries.password }

		const config = {
			headers: {
				'Content-type': 'application/json',
			},
		}

		const body = JSON.stringify(loginCreds)

		try {
			const res = await axios.post('/api/auth', body, config)
			console.log(res.data)
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name="emailAddr"
						type="email"
						placeholder="Enter email"
						value={formEntries.emailAddr}
						onChange={handleInputChange}
					/>
					<Form.Text className="text-muted">
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						placeholder="Password"
						value={formEntries.password}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Log In
				</Button>
			</Form>
		</Container>
	)
}

export default Login
