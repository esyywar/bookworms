import React from 'react'

import { useSelector } from 'react-redux'

import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
	const authUser = useSelector((state) => state.authUser)

	function canAccess() {
		return authUser.isAuthenticated && !authUser.loading
	}

	return (
		<Route
			{...rest}
			render={(routeProps) => (canAccess() ? children : <Redirect to="/login" />)}
		></Route>
	)
}

export default PrivateRoute
