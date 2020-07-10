import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { deleteComment } from '../../actions/post'

import Moment from 'react-moment'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function CommentDisp({ comment, postId }) {
	const dispatch = useDispatch()

	const user = useSelector((state) => state.authUser.user)

	return (
		<Container className="mt-2 w-25" style={{ backgroundColor: 'lightblue' }}>
			<img src={comment.avatar} style={{ width: '40px', height: '40px' }} alt="comment-poster" />
			<p>By: {comment.name}</p>
			<p>
				Posted on: <Moment format="YYYY/MM/DD">{comment.date}</Moment>
			</p>
			<p>{comment.text}</p>
			{user && comment.user === user._id && (
				<Button
					variant="danger"
					className="mb-2"
					onClick={() => dispatch(deleteComment(postId, comment._id))}
				>
					Delete Comment
				</Button>
			)}
		</Container>
	)
}

export default CommentDisp
