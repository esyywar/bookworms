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
	const profile = useSelector((state) => state.profile)

	return (
		<Container>
			{profile.profiles === [] || profile.loading ? (
				<Spinner />
			) : profile.profiles.length > 0 ? (
				profile.profiles.map((profile, index) => {
					return <ProfileCard key={index} profile={profile} />
				})
			) : (
				<h4>No profiles found :(</h4>
			)}
		</Container>
	)
}

export default Profiles
