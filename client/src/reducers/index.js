import { combineReducers } from 'redux'

import { alerts } from './alert'
import { authUser } from './auth'

const rootReducer = combineReducers({
	alerts,
	authUser,
})

export default rootReducer
