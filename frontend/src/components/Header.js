import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

const logout = () => {
  localStorage.clear('accessToken')
}

const Header = ({ auth, setAuth }) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">MyTodoApp</Navbar.Brand>
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="mr-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/todos">Todos</Nav.Link>
            <Nav.Link href="#" onClick={logout}>Logout</Nav.Link>
          </Nav>
        {/* </Navbar.Collapse> */}
      </Navbar>
    </div>
  )
}

export default Header
