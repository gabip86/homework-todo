import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

function Register() {
  return (
    <Container className="w-50 mx-auto mt-5">
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Username</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Username" name="username"></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control tpye="password" placeholder="Password" name="password"></Form.Control>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
