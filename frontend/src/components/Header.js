import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import Logout from './Logout'

const Header = ({ auth, setAuth }) => {
  console.log('header', auth)
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">MyTodoApp</Navbar.Brand>
          <Nav className="mr-auto">
            {!auth?.user?.username ?
              <><Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </> :
              <><Nav.Link href="/todos">Todos</Nav.Link>
                <Logout setAuth={setAuth}/>
              </>
            }
          </Nav>
      </Navbar>
    </div>
  )
}

export default Header
