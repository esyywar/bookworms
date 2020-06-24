import React, { Fragment } from 'react'

import { useSelector } from 'react-redux'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

import Nav from './components/NavMenu'
import Landing from './components/Landing'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import UserAlert from './components/UserAlert'

function App() {
	const alerts = useSelector((state) => state.alerts)

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
					</Switch>
				</Container>
			</Router>
		</Fragment>
	)
}

export default App
