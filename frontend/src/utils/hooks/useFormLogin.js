import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const useForm = (initialValues) => {
  const [inputs, setInputs] = useState(initialValues)
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState('')
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
        .catch(err => {
          const { msg } = err.response.data
          console.error(msg)
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
    validated
  }
}

export default useForm
