import React from 'react'

import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function DashActions() {
	return (
		<Container>
			<Link to="/library-add">
				<Button className="m-3">Edit Your Library</Button>
			</Link>
			<Link>
				<Button className="m-3">Add Fav Authors</Button>
			</Link>
			<Link>
				<Button className="m-3">Add Fav Books</Button>
			</Link>
		</Container>
	)
}

export default DashActions
