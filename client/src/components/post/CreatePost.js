import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { useHistory } from 'react-router-dom'

import { addPost } from '../../actions/post'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function CreatePost() {
	const dispatch = useDispatch()

	const history = useHistory()

	const [formEntries, setFormEntries] = useState({})

	function handleInputChange(e) {
		setFormEntries({ ...formEntries, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()

		dispatch(addPost(formEntries, history))
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="PlainText">
					<Form.Label>Title</Form.Label>
					<Form.Control
						name="title"
						type="text"
						placeholder="Title of your post"
						value={formEntries.name}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Content</Form.Label>
					<Form.Control
						name="text"
						as="textarea"
						rows="6"
						placeholder="Write your post!"
						value={formEntries.name}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Publish Post
				</Button>
			</Form>
		</Container>
	)
}

export default CreatePost
