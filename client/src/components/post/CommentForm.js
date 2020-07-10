import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { addComment } from '../../actions/post'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function CommentForm({ postId }) {
	const dispatch = useDispatch()

	const [formEntries, setFormEntries] = useState({})

	function handleInputChange(e) {
		setFormEntries({ ...formEntries, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()

		setFormEntries({})

		dispatch(addComment(postId, formEntries))
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="PlainText">
					<Form.Label>Leave A Comment</Form.Label>
					<Form.Control
						name="text"
						as="textarea"
						rows="3"
						placeholder="Your comment"
						value={formEntries.name}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button variant="primary" type="submit">
					Leave Comment
				</Button>
			</Form>
		</Container>
	)
}

export default CommentForm
