import React, { useEffect, Fragment } from 'react'

import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../../actions/profile'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import Spinner from '../SpinnerLoad'
import DashActions from './DashActions'
import LibraryDisp from './LibraryDisp'

export default function Dashboard() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getUserProfile())
	}, [dispatch])

	const user = useSelector((state) => state.authUser.user)
	const profile = useSelector((state) => state.profile)

	return (
		<Container>
			{profile.profile == null && profile.loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h3>User Dashboard</h3>
					<h2>Hello {user && user.name.split(' ')[0]}</h2>

					<Fragment>
						<DashActions />
					</Fragment>

					<Container>
						<Link to="/edit-profile">
							<Button>Edit Profile</Button>
						</Link>
					</Container>

					{/* Show user's library */}
					<Fragment>
						<LibraryDisp />
					</Fragment>

					{profile.profile == null && !profile.loading && (
						<Container className="mt-5">
							<h4>Looks like you have not created a profile yet!</h4>
							<Link to="/create-profile">
								<Button className="mt-3">Create Profile</Button>
							</Link>
						</Container>
					)}
				</Fragment>
			)}
		</Container>
	)
}
