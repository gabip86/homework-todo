import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()

  const username = inputs.username
  const password = inputs.password

  const handleInputChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }
    
    e.preventDefault()
    setValidated(true)

    const userObject = JSON.stringify({
      username: username,
      password: password,
    })

    axios.post('http://localhost:3000/login', userObject, {
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        if (response.status === 200) {
          const { accessToken } = response.data
          localStorage.setItem('accessToken', accessToken)
        }
        history.push('/todos')
      })
      .catch(err => console.error(err))
  }
  return (
    <Container className="w-50 mx-auto mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
            {/* <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              Username is required.
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
            {/* <Form.Control.Feedback>Looks Good!</Form.Control.Feedback> */}
            <Form.Control.Feedback type="invalid">
              Password is required.
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  )
}

export default Login
