import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../actions/auth'

import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/nav.css'

export default function NavMenu() {
	const authUser = useSelector((state) => state.authUser)
	const dispatch = useDispatch()

	/* Nav items when logged in */
	const guestNav = (
		<Nav className="ml-auto">
			<Nav.Link>
				<Link className="nav-link-item" to="/">
					Home
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="nav-link-item" to="/posts">
					Posts
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="nav-link-item" to="/profiles">
					Profiles
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="nav-link-item" to="/login">
					Log In
				</Link>
			</Nav.Link>
		</Nav>
	)

	const userNav = (
		<Nav className="ml-auto">
			<Nav.Link>
				<Link className="nav-link-item" to="/dashboard">
					Dashboard
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="nav-link-item" to="/posts">
					Posts
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="nav-link-item" to="/profiles">
					Profiles
				</Link>
			</Nav.Link>
			<Nav.Link>
				<Link className="nav-link-item" onClick={() => dispatch(logoutUser())}>
					<span>
						<FontAwesomeIcon icon="sign-out-alt" /> Log Out
					</span>
				</Link>
			</Nav.Link>
		</Nav>
	)

	/* Called to set navigation bar */
	function setNav(authUser) {
		if (!authUser.loading) {
			return authUser.isAuthenticated ? userNav : guestNav
		}
	}

	return (
		<nav>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">Navbar</Navbar.Brand>
				{setNav(authUser)}
			</Navbar>
			<br />
		</nav>
	)
}
