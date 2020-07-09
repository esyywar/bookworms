import React, { useEffect, Fragment } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { getProfileById } from '../../actions/profile'

import Container from 'react-bootstrap/Container'

import ProfileTop from './ProfileTop'
import ProfileBottom from './ProfileBottom'
import ProfileSocial from './ProfileSocial'
import LibraryDisp from '../dashboard/LibraryDisp'
import Spinner from '../SpinnerLoad'

export default function UserProfile() {
	const dispatch = useDispatch()

	const params = useParams()

	useEffect(() => {
		dispatch(getProfileById(params.id))
	}, [dispatch, params.id])

	const profile = useSelector((state) => state.profile)

	return (
		<Container className="text-center">
			{profile.profile == null || profile.loading ? (
				<Spinner />
			) : (
				<Fragment>
					<ProfileTop profile={profile.profile} />
					<ProfileBottom profile={profile.profile} />
					<ProfileSocial social={profile.profile.social} />
					<LibraryDisp />
				</Fragment>
			)}
		</Container>
	)
}
