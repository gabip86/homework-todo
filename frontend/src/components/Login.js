import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function Login() {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const history = useHistory()

  const username = inputs.username
  const password = inputs.password

  const handleInputChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

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
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Username</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              value={inputs.username}
              onChange={handleInputChange}
              placeholder="Username"
              name="username"></Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              value={inputs.password}
              onChange={handleInputChange}
              placeholder="Password"
              name="password"></Form.Control>
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
