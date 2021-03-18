import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import FormTodo from './FormTodo'
import Todo from './Todo'
import { Card } from 'react-bootstrap'
import axios from 'axios'

const MainTodo = ({ auth }) => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    if (auth.token) {
      axios.get('http://localhost:3000/todos', {
        headers: {
          authorization: "Bearer " + auth.token
        }
      }).then(({ data }) => {
        setTodos(data)
      })
        .catch(console.error)
    }
  }, [auth.token, todos])

  const addTodo = text => {
    const isDone = false

    try {
      axios.post("http://localhost:3000/todos", {
        text,
        isDone,
        userId: auth.user.id
      }, {
        headers: {
          authorization: "Bearer " + auth.token
        }
      })
    } catch (err) {
      console.error(err)
    }
  }

  const markTodo = id => {
    axios.put(`http://localhost:3000/todos/${id}`, {
      headers: {
        authorization: "Bearer " + auth.token
      }
    })
  }

  const removeTodo = id => {
    axios.delete(`http://localhost:3000/todos/${id}`, {
      headers: {
        authorization: "Bearer " + auth.token
      }
    })
  }

  return (
    <div className="app">
      <div className="container">
        {!auth?.user?.username ?
          <>
            <h1 className="text-center mb-4">Todo List</h1>
          </> :
          <>
            <h1 className="text-center mb-4">{auth.user.username}'s Todo List</h1>
          </>
        }
        <FormTodo addTodo={addTodo} />
        <div>
          {todos.map((todo, id) => (
            <Card key={id}>
              <Card.Body>
                <Todo
                  index={id}
                  todo={todo}
                  markTodo={markTodo}
                  removeTodo={removeTodo}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default withRouter(MainTodo)
