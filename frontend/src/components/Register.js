import React from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import useForm from '../utils/hooks/useForm.js'

function Register() {
  const { inputs, handleInputChange, handleSubmit, error, message, validated } = useForm({
    username: '',
    password: '',
    error: '',
    message: ''
  })

  return (
    <Container className="w-75 mx-auto needs-validation">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Register</h1>
        {message ? <><Alert variant="success">{message}</Alert></> : <></>}
        <Form.Group as={Row} controlId="validationCustom01">
          <Form.Label column sm={2}>Username</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={inputs.username}
              onChange={handleInputChange}
              placeholder="Username"
              name="username"
              required
            />
            <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="validationCustom02">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              value={inputs.password}
              onChange={handleInputChange}
              placeholder="Password"
              name="password"
              minLength="8"
              required
            />
            <Form.Control.Feedback>Looks Good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
            <Form.Text id="passwordHelpInline" muted>
              Must be min 8 characters long.
            </Form.Text>
          </Col>
        </Form.Group>
        {error ? <><Alert variant="danger">{error}</Alert></> : <></>}
        <Button variant="info" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
