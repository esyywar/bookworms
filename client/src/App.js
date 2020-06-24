import React, { Fragment, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { loadUser } from './actions/auth'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/routing/PrivateRoute'

import Container from 'react-bootstrap/Container'

import Nav from './components/NavMenu'
import Landing from './components/Landing'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import UserAlert from './components/UserAlert'

import Dashboard from './components/dashboard/Dashboard'

function App() {
	const alerts = useSelector((state) => state.alerts)
	const dispatch = useDispatch()

	/* Check for token in client's cache/cookies */
	useEffect(() => {
		dispatch(loadUser())
	}, [dispatch])

	return (
		<Fragment>
			<Router>
				<Nav />
				<Container fluid>
					<UserAlert alerts={alerts} />
					<Switch>
						<Route path="/" exact>
							<Landing />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
						<Route path="/register">
							<Register />
						</Route>
						<PrivateRoute path="/dashboard">
							<Dashboard />
						</PrivateRoute>
					</Switch>
				</Container>
			</Router>
		</Fragment>
	)
}

export default App
