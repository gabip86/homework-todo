import axios from 'axios'

const addTodo = (todo) => {
  try {
    console.log(todo)
    return axios.post("http://localhost:3000/addtodo", { todo },
      { headers: { authorization: "Bearer " + localStorage.getItem('accessToken') } })
  } catch (err) {
    const { data } = err.response
    const { message } = data
    console.error(message)
  }
}

export default addTodo