import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { useParams } from 'react-router-dom'

import { getProfileById } from '../../actions/profile'

import Container from 'react-bootstrap/Container'

import Spinner from '../SpinnerLoad'

export default function UserProfile(props) {
	const dispatch = useDispatch()

	const params = useParams()

	useEffect(() => {
		dispatch(getProfileById(params.id))
	}, [dispatch, params.id])

	const profile = useSelector((state) => state.profile)

	return (
		<Container>
			{profile.profile == null && profile.loading ? <Spinner /> : profile.profile.name}
		</Container>
	)
}
