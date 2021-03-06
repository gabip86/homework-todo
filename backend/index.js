import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get('/', (req, res) => {
  res.send('My Homework Todo App')
})

app.post('/register',)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
