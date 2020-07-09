import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ProfileBottom({ profile: { favBooks, favAuthors } }) {
	const bookDisp = favBooks && favBooks.length > 0 && favBooks.slice(0, 3)
	const authorDisp = favAuthors && favAuthors.length > 0 && favAuthors.slice(0, 3)

	return (
		<Container fluid className="text-center">
			<Row className="m-4">
				<Col>
					<h4>Favourite Books</h4>
					{bookDisp ? (
						bookDisp.map((book, index) => {
							return <p key={index}>{book}</p>
						})
					) : (
						<p>No favourite books added yet!</p>
					)}
				</Col>

				<Col className="m-4">
					<h4>Favourite Authors</h4>

					{authorDisp ? (
						authorDisp.map((author, index) => {
							return <p key={index}>{author}</p>
						})
					) : (
						<p>No favourite authors added yet!</p>
					)}
				</Col>
			</Row>
		</Container>
	)
}

export default ProfileBottom
