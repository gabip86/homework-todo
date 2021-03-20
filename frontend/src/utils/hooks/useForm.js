import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues)
  const [validated, setValidated] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const history = useHistory()

  const handleSubmit = e => {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    }

    e.preventDefault()
    setValidated(true)

    const username = inputs.username
    const password = inputs.password

    const userObject = JSON.stringify({
      username,
      password,
    })

    if (!inputs.username || !inputs.password) {
      setError('Username and password are required.')
    } else if (inputs.password.length < 8) {
      setError('Password must be 8 characters long.')
    } else {
      axios.post('http://localhost:3000/register', userObject, {
        headers: {
          "content-type": "application/json"
        }
      })
        .then(response => {
          const { message } = response.data
          setMessage(message)
          history.push('/login')
        })
        .catch(err => {
          const { message } = err.response.data
          setError(message)
        })
    }
  }

  const handleInputChange = (e) => {
    e.persist()
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    error,
    message,
    validated
  }
}

export default useForm
