import React from 'react'

import { useSelector } from 'react-redux'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'

function LibraryDisp() {
	const library = useSelector((state) => state.profile.library)

	console.log(library)

	return (
		<Container className="mt-5">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Year</th>
						<th>Rating (1 - 10)</th>
						<th>Comments</th>
					</tr>
				</thead>
				<tbody>
					{library.map((book, index) => {
						return (
							<tr key={index}>
								<td>{book.title}</td>
								<td>{book.author}</td>
								<td>{book.year}</td>
								<td>{book.rating}</td>
								<td>{book.comments}</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</Container>
	)
}

export default LibraryDisp
