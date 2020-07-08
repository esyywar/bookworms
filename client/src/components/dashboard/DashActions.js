import React from 'react'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function DashActions() {
	return (
		<Container className="mt-3 mb-3">
			<Link to="/library-add">
				<Button className="mr-3">Edit Your Library</Button>
			</Link>
			<Link>
				<Button className="mr-3">Add Fav Authors</Button>
			</Link>
			<Link>
				<Button className="mr-3">Add Fav Books</Button>
			</Link>
		</Container>
	)
}

export default DashActions
