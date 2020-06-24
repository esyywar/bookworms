import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { setAlert } from '../../actions/alert'

import Container from 'react-bootstrap/Container'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Register() {
	/********************* LOCAL STATE VARIABLES ********************/
	const initialState = { name: '', emailAddr: '', password: '', password2: '' }
	const [formEntries, setFormEntries] = useState(initialState)

	/********************* REDUX STORE MANAGEMENT *********************/

	const dispatch = useDispatch()

	/******************** FORM UPDATE & SUBMIT FUNCTIONS ******************/

	function handleInputChange(e) {
		setFormEntries({ ...formEntries, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()
		if (formEntries.password !== formEntries.password2) {
			dispatch(setAlert('Passwords do not match!', 'danger'))
		}
		console.log(formEntries)
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="name">
					<Form.Label>Name</Form.Label>
					<Form.Control
						name="name"
						type="text"
						placeholder="Enter your name"
						value={formEntries.name}
						onChange={handleInputChange}
					/>
				</Form.Group>

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
				<Form.Group controlId="formBasicPasswordRepeat">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						name="password2"
						type="password"
						placeholder="Comfirm password"
						value={formEntries.password2}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Register
				</Button>
			</Form>
		</Container>
	)
}
