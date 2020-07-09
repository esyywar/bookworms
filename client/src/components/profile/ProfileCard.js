import React from 'react'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

function ProfileCard(props) {
	return (
		<Container className="m-4">
			<Card style={{ width: '18rem' }}>
				<Card.Img variant="top" src={props.profile.user.avatar} />
				<Card.Body>
					<Card.Title>{props.profile.user.name}</Card.Title>
					<Card.Text>{props.profile.bio}</Card.Text>
				</Card.Body>
				<Link to={`/user-profile/${props.profile.user._id}`}>
					<Button variant="primary">View Profile</Button>
				</Link>
				<ListGroup className="list-group-flush">
					<ListGroupItem>{props.profile.status}</ListGroupItem>
					<ListGroupItem>{props.profile.language}</ListGroupItem>
				</ListGroup>
			</Card>
		</Container>
	)
}

export default ProfileCard
