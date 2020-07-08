import axios from 'axios'

import { setAlert } from './alert'

import { GET_PROFILE, CREATE_PROFILE, PROFILE_ERROR } from '../actions/types'

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
		console.log(error.message)
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
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: error.response.statusText, status: error.response.status },
		})

		const errors = error.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
	}
}
