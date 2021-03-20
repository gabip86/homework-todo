import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import useForm from '../utils/hooks/useFormLogin.js'

const Login = ({ auth, setAuth }) => {

  const { inputs, handleInputChange, handleSubmit, error, validated } = useForm({
    username: '',
    password: '',
    error: ''
  }, auth, setAuth)

  return (
    <Container className="w-75 mx-auto">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h1>Login</h1>
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
              required
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button variant="info" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login
