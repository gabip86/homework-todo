import React, { useEffect } from 'react'
import { useState } from 'react'
import FormTodo from './FormTodo'
import Todo from './Todo'
import { Card } from 'react-bootstrap'
import axios from 'axios'

const MainTodo = ({ auth, }) => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      axios.get('http://localhost:3000/todos', {
        headers: {
          authorization: `Bearer ${token}`
        }
      }).then(({ data }) => {
        const { text } = data
        setTodos({ ...todos })
      })
        .catch(console.error)
    }
  }, [todos])

  const addTodo = text => {
    const todo = {
      text: text,
      isDone: false
    }

    try {
      axios.post("http://localhost:3000/addtodo",
        { todo }, {
        headers: {
          authorization: "Bearer " + localStorage.getItem('accessToken')
        }
      })
      axios.get("http://localhost:3000/todos", {
        headers: {
          authorization: "Bearer " + localStorage.getItem('accessToken')
        }
      }).then(res => setTodos(res))
    } catch (err) {
      console.error(err)
    }
  }

  // const addTodo = text => {
  //   const newTodos = [...todos, { text }]
  //   setTodos(newTodos)
  // }

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
        <h1 className="text-center mb-4">Todo List</h1>
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
