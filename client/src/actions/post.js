import axios from 'axios'

import { setAlert } from './alert'

import {
	GET_POST,
	GET_POSTS,
	CLEAR_POST,
	UPDATE_LIKES,
	DELETE_POST,
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
		console.log(error.response)
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
		dispatch({
			type: POST_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})
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
