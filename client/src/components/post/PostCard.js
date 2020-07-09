import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'

import { toggleLikePost } from '../../actions/post'

import Moment from 'react-moment'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function PostCard({ post: { name, text, date, likes, comments, _id } }) {
	const dispatch = useDispatch()

	return (
		<Container className="mt-3">
			<Card style={{ width: '18rem' }}>
				<Card.Body>
					<Card.Title>{name}</Card.Title>
					<Card.Subtitle className="mb-2 text-muted">
						<Moment format="YYYY/MM/DD">{date}</Moment>
					</Card.Subtitle>
					<Card.Text>{text}</Card.Text>

					<Card.Text>
						<FontAwesomeIcon
							icon="heart"
							className="mr-1"
							style={{ cursor: 'pointer' }}
							onClick={() => dispatch(toggleLikePost(_id))}
						/>
						{likes.length > 0 && likes.length}
					</Card.Text>

					<Card.Text>
						<FontAwesomeIcon icon="comment" className="mr-1" />
						{comments.length > 0 && comments.length}
					</Card.Text>

					<Link to={`/post/${_id}`}>
						<Button>Discussion</Button>
					</Link>
				</Card.Body>
			</Card>
		</Container>
	)
}

export default PostCard
