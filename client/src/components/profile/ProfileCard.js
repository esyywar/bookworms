import React from 'react'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

function ProfileCard(props) {
	return (
		<Container>
			<Card style={{ width: '18rem' }}>
				<Card.Img variant="top" src={props.profile.user.avatar} />
				<Card.Body>
					<Card.Title>{props.profile.user.name}</Card.Title>
					<Card.Text>{props.profile.bio}</Card.Text>
				</Card.Body>
				<ListGroup className="list-group-flush">
					<ListGroupItem>{props.profile.status}</ListGroupItem>
					<ListGroupItem>{props.profile.language}</ListGroupItem>
				</ListGroup>
			</Card>
		</Container>
	)
}

export default ProfileCard
