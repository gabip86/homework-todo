import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'

function Register() {
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

    if (!inputs.username) {
      setError("Username is required.")
    } else if (!inputs.password) {
      setError("Password is required")
    } else {
      axios.post('http://localhost:3000/register', userObject, {
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => {
          history.push('/login')
        })
        .catch(err => {
          const {msg} = err.response.data
          setError(msg)
        })
    }
  }

  return (
    <Container className="w-50 mx-auto mt-5 needs-validation">
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
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default Register
