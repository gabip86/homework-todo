import React from 'react'
import { useState } from 'react'
import FormTodo from './FormTodo'
import Todo from './Todo'
import addTodo from '../utils/hooks/addTodo'
import { Card } from 'react-bootstrap'

const MainTodo = ({ auth, setAuth }) => {
  const [todos, setTodos] = useState([])

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
