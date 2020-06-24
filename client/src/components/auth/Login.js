import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { loginUser } from '../../actions/auth'

import Container from 'react-bootstrap/Container'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function Login() {
	const initialState = { email: '', password: '' }
	const [formEntries, setFormEntries] = useState(initialState)
	const dispatch = useDispatch()

	function handleInputChange(e) {
		setFormEntries({ ...formEntries, [e.target.name]: e.target.value })
	}

	async function handleSubmit(e) {
		e.preventDefault()

		dispatch(loginUser(formEntries))
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control
						name="email"
						type="email"
						placeholder="Enter email"
						value={formEntries.email}
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
