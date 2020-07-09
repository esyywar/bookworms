import React from 'react'

import Container from 'react-bootstrap/Container'

function ProfileTop({ profile: { user, name, status, bio, location } }) {
	return (
		<Container fluid className="text-center" style={{ backgroundColor: 'lightblue' }}>
			{user && <img src={user.avatar} alt="profile-pic" />}
			<h3>{name}</h3>
			<h4>{status}</h4>
			<h4>{bio}</h4>
			<h4>{location}</h4>
		</Container>
	)
}

export default ProfileTop
