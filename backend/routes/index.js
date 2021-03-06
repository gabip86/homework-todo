import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ test: 'test' })
})

export { router }
