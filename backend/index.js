import express from 'express'
import cors from 'cors'
import { router as apiRouter } from './routes/index.js'
import { router as todosRouter} from './routes/todos.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/', apiRouter)
app.use('/', todosRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
