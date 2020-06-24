import React from 'react'
import PropTypes from 'prop-types'

import { useDispatch } from 'react-redux'
import { resetAlert } from '../actions/alert'

import Alert from 'react-bootstrap/Alert'

function UserAlert(props) {
	const alerts = props.alerts

	const dispatch = useDispatch()

	return (
		alerts.length > 0 &&
		alerts.map((element, index) => {
			return (
				<Alert
					key={index}
					variant={element.type}
					onClose={() => dispatch(resetAlert(element.id))}
					dismissible
				>
					{element.msg}
				</Alert>
			)
		})
	)
}

UserAlert.propTypes = {
	alerts: PropTypes.array,
}

export default UserAlert
