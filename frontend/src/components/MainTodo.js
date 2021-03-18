import React, { useEffect } from 'react'
import { useState } from 'react'
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
  }, [todos])

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

  const markTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isDone = true
    setTodos(newTodos)
  }

  const removeTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
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
          {todos.map((todo, index) => (
            <Card key={index}>
              <Card.Body>
                <Todo
                  index={index}
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

export default MainTodo
