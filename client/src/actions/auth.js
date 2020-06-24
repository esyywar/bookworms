import axios from 'axios'

import { setAlert } from './alert'

import {
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAILED,
	REGISTER_SUCCESS,
	REGISTER_FAILED,
} from './types'

import { setAuthToken } from '../util/setAuthToken'

/* Load user credentials from local storage and authenticate */
export const loadUser = () => async (dispatch) => {
	console.log(localStorage.token)
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}

	try {
		console.log('load user request made')
		const res = await axios.get('/api/auth')

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		})
	} catch (error) {
		dispatch({
			type: AUTH_ERROR,
		})
	}
}

/* Login user - call API with login credentials */
export const loginUser = ({ email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	}

	const body = JSON.stringify({ email, password })

	try {
		const res = await axios.post('/api/auth', body, config)

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		})

		dispatch(setAlert(res.data.msg, 'success'))
	} catch (error) {
		dispatch({
			type: LOGIN_FAILED,
		})

		const errors = error.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))

		console.log(error.message)
	}
}

/* Register user - call to API and dispatch */
export const registerUser = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	}

	const body = JSON.stringify({ name, email, password })

	try {
		const res = await axios.post('/api/users', body, config)

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		})
	} catch (error) {
		dispatch({
			type: REGISTER_FAILED,
		})

		const errors = error.response.data.errors
		errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))

		console.log(error.message)
	}
}
