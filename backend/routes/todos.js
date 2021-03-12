import express from 'express'
import { db } from '../db/index.js'
import authenticateToken from '../middleware/auth.js'

const router = express.Router()

router.get('/todos', authenticateToken, async (req, res) => {
  try {
    let results = await db.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    res.status(500)
  }
})

export { router }
