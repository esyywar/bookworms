import React, { useEffect, Fragment } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { getPostById } from '../../actions/post'

import Moment from 'react-moment'

import CommentDisp from './CommentDisp'
import CommentForm from './CommentForm'
import Spinner from '../SpinnerLoad'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

export default function Post() {
	const dispatch = useDispatch()

	const params = useParams()

	useEffect(() => {
		dispatch(getPostById(params.id))
	}, [dispatch, params.id])

	const post = useSelector((state) => state.post)

	return (
		<Container fluid className="text-left">
			{!post.post || post.loading ? (
				<Spinner />
			) : (
				<Fragment>
					<Container className="text-center">
						<h3>{post.post.title}</h3>
						<p>Author: {post.post.name}</p>
						<p>
							Posted On: <Moment format="YYYY/MM/DD">{post.post.date}</Moment>
						</p>
					</Container>

					<Container fluid className="mt-4 text-center">
						{post.post.text}
					</Container>

					<Container fluid className="text-left">
						{post.post.comments.length > 0 &&
							post.post.comments.map((comment) => (
								<CommentDisp comment={comment} postId={post._id} />
							))}
					</Container>

					{/* Likes and comments section */}
					<Container className="mt-3 w-50">
						<Row>
							<Button>Like</Button>
						</Row>
						<Row className="mt-3">
							<CommentForm postId={post.post._id} />
						</Row>
					</Container>
				</Fragment>
			)}
		</Container>
	)
}
