import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Link, useHistory } from 'react-router-dom'

import { getUserProfile, createProfile } from '../../actions/profile'

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

function EditProfile() {
	const dispatch = useDispatch()

	const profile = useSelector((state) => state.profile.profile)
	const loading = useSelector((state) => state.profile.loading)

	useEffect(() => {
		dispatch(getUserProfile())
	}, [dispatch])

	const [formEntries, setFormEntries] = useState({})

	/* Fill profile fields with current values */
	useEffect(() => {
		formEntries.name = !loading && profile.name ? profile.name : ''
		formEntries.bio = !loading && profile.bio ? profile.bio : ''
		formEntries.language = !loading && profile.language ? profile.language : ''
		formEntries.company = !loading && profile.company ? profile.company : ''
		formEntries.website = !loading && profile.website ? profile.website : ''
		formEntries.location = !loading && profile.location ? profile.location : ''

		if (profile.social) {
			formEntries.youtube = !loading && profile.social.youtube ? profile.social.youtube : ''
			formEntries.twitter = !loading && profile.social.twitter ? profile.social.twitter : ''
			formEntries.linkedin = !loading && profile.social.linkedin ? profile.social.linkedin : ''
			formEntries.instagram = !loading && profile.social.instagram ? profile.social.instagram : ''
		}
		// eslint-disable-next-line
	}, [profile, loading])

	const history = useHistory()

	function handleInputChange(e) {
		setFormEntries({ ...formEntries, [e.target.name]: e.target.value })
		console.log(formEntries)
	}

	function handleSubmit(e) {
		e.preventDefault()

		dispatch(createProfile(formEntries, history, true))
	}

	return (
		<Container className="mb-3">
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
				<Form.Group controlId="name">
					<Form.Label>Bio</Form.Label>
					<Form.Control
						name="bio"
						type="textarea"
						placeholder="A little about yourself!"
						value={formEntries.bio}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Language</Form.Label>
					<Form.Control
						name="language"
						type="text"
						placeholder="Your language"
						value={formEntries.language}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Company</Form.Label>
					<Form.Control
						name="company"
						type="text"
						placeholder="Company"
						value={formEntries.company}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Website</Form.Label>
					<Form.Control
						name="website"
						type="text"
						placeholder="Website"
						value={formEntries.website}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Form.Group controlId="PlainText">
					<Form.Label>Location</Form.Label>
					<Form.Control
						name="location"
						type="text"
						placeholder="Location"
						value={formEntries.location}
						onChange={handleInputChange}
					/>
				</Form.Group>
				<Container>
					<h3>Social Links</h3>
					<Form.Group controlId="PlainText">
						<Form.Label>Youtube</Form.Label>
						<Form.Control
							name="youtube"
							type="text"
							placeholder="Youtube channel link"
							value={formEntries.youtube}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId="PlainText">
						<Form.Label>Twitter</Form.Label>
						<Form.Control
							name="twitter"
							type="text"
							placeholder="Twitter link"
							value={formEntries.twitter}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId="PlainText">
						<Form.Label>LinkedIn</Form.Label>
						<Form.Control
							name="linkedin"
							type="text"
							placeholder="LinkedIn profile link"
							value={formEntries.linkedIn}
							onChange={handleInputChange}
						/>
					</Form.Group>
					<Form.Group controlId="PlainText">
						<Form.Label>Instagram</Form.Label>
						<Form.Control
							name="instagram"
							type="text"
							placeholder="Insta profile link"
							value={formEntries.instagram}
							onChange={handleInputChange}
						/>
					</Form.Group>
				</Container>
				<Button variant="primary" type="submit">
					Update Profile
				</Button>
				<Link to="/dashboard">
					<Button>Back to Dashboard</Button>
				</Link>
			</Form>
		</Container>
	)
}

export default EditProfile
