import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getAllProfiles } from '../../actions/profile'

import Container from 'react-bootstrap/Container'

import ProfileCard from './ProfileCard'
import Spinner from '../SpinnerLoad'

function Profiles() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllProfiles())
	}, [dispatch])

	/* Read profiles of all users */
	const profiles = useSelector((state) => state.profile)

	return (
		<Container>
			{profiles.profile == null && profiles.loading ? (
				<Spinner />
			) : profiles.profile.length > 0 ? (
				profiles.profile.map((profile, index) => {
					return <ProfileCard profile={profile} />
				})
			) : (
				<h4>No profiles found :(</h4>
			)}
		</Container>
	)
}

export default Profiles
