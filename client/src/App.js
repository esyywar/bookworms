import React, { Fragment, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { loadUser } from './actions/auth'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/routing/PrivateRoute'

import Container from 'react-bootstrap/Container'

import Nav from './components/NavMenu'
import Landing from './components/Landing'

import Profiles from './components/profile/Profiles'
import UserProfile from './components/profile/UserProfile'

import CreatePost from './components/post/CreatePost'
import Posts from './components/post/Posts'
import Post from './components/post/Post'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import UserAlert from './components/UserAlert'

import Dashboard from './components/dashboard/Dashboard'
import EditProfile from './components/profileForms/EditProfile'
import CreateProfile from './components/profileForms/CreateProfile'

import LibraryAdd from './components/profileForms/LibraryAdd'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSignOutAlt, faHeart, faComment, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faSignOutAlt, faHeart, faComment, faThumbsDown)

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
						<Route path="/profiles">
							<Profiles />
						</Route>
						<Route path="/user-profile/:id">
							<UserProfile />
						</Route>
						<Route path="/posts">
							<Posts />
						</Route>
						<Route path="/post/:id">
							<Post />
						</Route>
						<PrivateRoute path="/dashboard">
							<Dashboard />
						</PrivateRoute>
						<PrivateRoute path="/create-profile">
							<CreateProfile />
						</PrivateRoute>
						<PrivateRoute path="/edit-profile">
							<EditProfile />
						</PrivateRoute>
						<PrivateRoute path="/library-add">
							<LibraryAdd />
						</PrivateRoute>
						<PrivateRoute path="/create-post">
							<CreatePost />
						</PrivateRoute>
					</Switch>
				</Container>
			</Router>
		</Fragment>
	)
}

export default App
