import { combineReducers } from 'redux'

import { alerts } from './alert'
import { authUser } from './auth'
import { profile } from './profile'
import { post } from './post'

const rootReducer = combineReducers({
	alerts,
	authUser,
	profile,
	post,
})

export default rootReducer
