import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import { deleteFromLibrary } from '../../actions/profile'

import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

function LibraryDisp() {
	const dispatch = useDispatch()

	const library = useSelector((state) => state.profile.library)

	return (
		<Container className="mt-5">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Title</th>
						<th>Author</th>
						<th>Year</th>
						<th>Rating (1 - 10)</th>
						<th></th>
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
								<td>
									<Button variant="danger" onClick={() => dispatch(deleteFromLibrary(book._id))}>
										Delete
									</Button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</Table>
		</Container>
	)
}

export default LibraryDisp
