import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { addToLibrary } from '../../actions/profile'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function LibraryAdd() {
	const dispatch = useDispatch()

	const [formEntries, setFormEntries] = useState({})

	function handleInputChange(e) {
		setFormEntries({ ...formEntries, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()
		dispatch(addToLibrary(formEntries))
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="PlainText">
					<Form.Label>Title</Form.Label>
					<Form.Control
						name="title"
						type="text"
						placeholder="Book title"
						value={formEntries.title}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Author</Form.Label>
					<Form.Control
						name="author"
						type="text"
						placeholder="Author"
						value={formEntries.author}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Year</Form.Label>
					<Form.Control
						name="year"
						type="text"
						placeholder="Year"
						value={formEntries.year}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Rating ( 1- 5)</Form.Label>
					<Form.Control
						name="rating"
						type="number"
						placeholder="5"
						value={formEntries.rating}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Comments</Form.Label>
					<Form.Control
						name="comments"
						as="textarea"
						rows="3"
						placeholder="Comments"
						value={formEntries.comments}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Button type="submit">Add To My Library</Button>
			</Form>
			<Link to="/dashboard">
				<Button className="mt-3">Back to Dashboard</Button>
			</Link>
		</Container>
	)
}

export default LibraryAdd
