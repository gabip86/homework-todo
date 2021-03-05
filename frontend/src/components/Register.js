import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

function Register() {
  return (
    <Container>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Username</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Username"></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control tpye="password" placeholder="Password"></Form.Control>
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
