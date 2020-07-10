import axios from 'axios'

import { setAlert } from './alert'

import {
	GET_POST,
	GET_POSTS,
	UPDATE_LIKES,
	ADD_POST,
	DELETE_POST,
	ADD_COMMENT,
	DELETE_COMMENT,
	POST_ERROR,
} from '../actions/types'

/* Get all posts */
export const getAllPosts = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/posts')

		dispatch({
			type: GET_POSTS,
			payload: res.data,
		})
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})
	}
}

/* Get post by id */
export const getPostById = (postId) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/posts/${postId}`)

		dispatch({
			type: GET_POST,
			payload: res.data,
		})
	} catch (error) {
		console.log(error)
	}
}

/* Toggle user's liking of post */
export const toggleLikePost = (postId) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const res = await axios.put(`/api/posts/like/${postId}`, config)

		dispatch({
			type: UPDATE_LIKES,
			payload: { postId, likes: res.data.post.likes },
		})

		dispatch(setAlert(res.data.msg, 'success'))
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})
	}
}

/* Adding a post */
export const addPost = (postData, history) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const res = await axios.post('/api/posts', postData, config)

		dispatch({
			type: ADD_POST,
			paoload: res.data,
		})

		dispatch(setAlert('Your post has been published!', 'success'))

		history.push('/dashboard')
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})

		const errors = error.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}

/* Delete a user's post */
export const deletePostById = (postId) => async (dispatch) => {
	try {
		await axios.delete(`/api/posts/${postId}`)

		dispatch({
			type: DELETE_POST,
			payload: postId,
		})

		dispatch(setAlert('Post deleted!', 'success'))
	} catch (error) {
		console.log(error.response)
	}
}

/* Add comment to post */
export const addComment = (postId, commentData) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}

	try {
		const res = await axios.post(`/api/posts/comment/${postId}`, commentData, config)

		dispatch({
			type: ADD_COMMENT,
			payload: res.data,
		})

		dispatch(setAlert('Comment added!', 'success'))
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})
	}
}

/* Delete comment */
export const deleteComment = (postId, commentId) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

		dispatch({
			type: DELETE_COMMENT,
			payload: res.data,
		})

		dispatch(setAlert('Comment deleted!', 'success'))
	} catch (error) {
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})
	}
}
