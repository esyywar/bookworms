import React, { Fragment } from 'react'

import Container from 'react-bootstrap/Container'

function ProfileSocial({ social }) {
	return (
		<Fragment>
			{social && (
				<Container>
					{social.youtube && <h3>{social.youtube}</h3>}
					{social.twitter && <h3>{social.twitter}</h3>}
					{social.linkedin && <h3>{social.linkedin}</h3>}
					{social.linkedin && <h3>{social.instagram}</h3>}
				</Container>
			)}
		</Fragment>
	)
}

export default ProfileSocial
