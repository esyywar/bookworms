import React from 'react'

import { Link } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import '../css/nav.css'

export default function NavMenu() {
	return (
		<nav>
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="#home">Navbar</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link>
						<Link className="nav-link-item" to="/">
							Home
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link className="nav-link-item" to="/login">
							Log In
						</Link>
					</Nav.Link>
					<Nav.Link>
						<Link className="nav-link-item" to="/register">
							Sign Up
						</Link>
					</Nav.Link>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-info">Search</Button>
				</Form>
			</Navbar>
			<br />
		</nav>
	)
}
