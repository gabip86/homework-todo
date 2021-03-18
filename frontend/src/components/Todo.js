import React from 'react'
import { Button } from 'react-bootstrap'

const Todo = ({ todo, markTodo, removeTodo }) => {
  return (
    <div className="todo">
      <span style={{ textDecoration: todo.isDone ? "line-through" : "" }}>{todo.text}</span>
      <div>
        <Button variant="outline-info" onClick={() => markTodo(todo.id)}>✓</Button>{' '}
        <Button variant="outline-dark" onClick={() => removeTodo(todo.id)}>✕</Button>
      </div>
    </div>
  )
}

export default Todo
