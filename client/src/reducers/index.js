import { combineReducers } from 'redux'

import { alerts } from './alert'
import { authUser } from './auth'
import { profile } from './profile'

const rootReducer = combineReducers({
	alerts,
	authUser,
	profile,
})

export default rootReducer
