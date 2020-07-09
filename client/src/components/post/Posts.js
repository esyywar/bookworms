import React, { useEffect, Fragment } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getAllPosts } from '../../actions/post'

import PostCard from './PostCard'

import Container from 'react-bootstrap/Container'
import Spinner from '../SpinnerLoad'

function Posts() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllPosts())
	}, [dispatch])

	const post = useSelector((state) => state.post)

	return (
		<Container>
			{post.posts === [] && post.loading ? (
				<Spinner />
			) : post.posts.length > 0 ? (
				<Fragment>
					{post.posts.map((post) => (
						<PostCard post={post} />
					))}
				</Fragment>
			) : (
				<h4>No posts found :(</h4>
			)}
		</Container>
	)
}

export default Posts
