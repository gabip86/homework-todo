import React from 'react'
import { withRouter } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const Logout = (props) => {
  const handleLogout = () => {
    localStorage.clear('accessToken')
    props.history.push('/login')
  }

  return (
    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
  )
}

export default withRouter(Logout)
