import express from 'express'
import cors from 'cors'
import { router as apiRouter } from './routes/api.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/', apiRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
