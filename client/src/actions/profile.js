import axios from 'axios'

import { setAlert } from './alert'

import {
	GET_PROFILE,
	CREATE_PROFILE,
	PROFILE_ERROR,
	UPDATE_LIBRARY,
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
} from '../actions/types'

/* Get current user's profile */
export const getUserProfile = () => async (dispatch) => {
	try {
		const res = await axios.get('api/profile/me')

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		})
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})
	}
}

/* Create or edit profile */
export const createProfile = (formData, history, edit = false) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const res = await axios.post('/api/profile', formData, config)

		dispatch({
			type: CREATE_PROFILE,
			payload: res.data,
		})

		const msg = edit ? 'Profile updated!' : 'Profile created!'

		dispatch(setAlert(msg, 'success'))

		if (!edit) {
			history.push('/dashboard')
		}
	} catch (error) {
		console.log(error.response)
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})

		const errors = error.response.data.errors

		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
	}
}

/* Add book to libary */
export const addToLibrary = (libraryAdd) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const res = await axios.put('/api/profile/library', libraryAdd, config)

		dispatch({
			type: UPDATE_LIBRARY,
			payload: res.data,
		})

		const msg = 'Library updated!'

		dispatch(setAlert(msg, 'success'))
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})

		const errors = error.response.data.errors

		if (errors) {
			if (Array.isArray(errors)) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
			} else {
				dispatch(setAlert(errors.msg, 'danger'))
			}
		}
	}
}

/* Remove book from library */
export const deleteFromLibrary = (id) => async (dispatch) => {
	try {
		const res = await axios.delete(`/api/profile/library/${id}`)

		dispatch({
			type: UPDATE_LIBRARY,
			payload: res.data,
		})

		dispatch(setAlert('Book removed from library!', 'success'))
	} catch (error) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})

		const errors = error.response.data.errors

		if (errors) {
			if (Array.isArray(errors)) {
				errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
			} else {
				dispatch(setAlert(errors.msg, 'danger'))
			}
		}
	}
}

/* Delete user's account and profile */
export const deleteAccount = () => async (dispatch) => {
	if (window.confirm('Are you sure you want to delete? (This action can not be undone!)')) {
		try {
			await axios.delete('/api/profile')

			dispatch({ type: CLEAR_PROFILE })
			dispatch({ type: ACCOUNT_DELETED })

			dispatch(setAlert('Account has been deleted!', 'info'))
		} catch (error) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: error.response.statusText, status: error.response.status },
			})

			const errors = error.response.data.errors

			if (errors) {
				if (Array.isArray(errors)) {
					errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
				} else {
					dispatch(setAlert(errors.msg, 'danger'))
				}
			}
		}
	}
}
