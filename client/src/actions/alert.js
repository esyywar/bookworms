import { v4 as uuid } from 'uuid'

import { SET_ALERT, RESET_ALERT } from './types'

export const setAlert = (msg, type, timeout = 5000) => (dispatch) => {
	const id = uuid()

	dispatch({
		type: SET_ALERT,
		payload: {
			id,
			msg,
			type,
		},
	})

	setTimeout(
		() =>
			dispatch({
				type: RESET_ALERT,
				payload: {
					id,
				},
			}),
		timeout
	)
}

export const resetAlert = (id) => {
	return {
		type: RESET_ALERT,
		payload: {
			id,
		},
	}
}
