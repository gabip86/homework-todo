import axios from 'axios'

const addTodo = async (type) => {
  try {
    return axios.post("http://localhost:3000/kingdom/buildings", { type: type.toLowerCase() },
      { headers: { authorization: "Bearer " + localStorage.getItem("token") } })
  } catch (err) {
    const { data } = err.response
    const { message } = data
    console.error(message)
  }
}

export default addTodo
