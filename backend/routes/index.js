import express from 'express'
import { db } from '../db/index.js'

const router = express.Router()

router.get('/users', async (req, res) => {

  try {
    let results = await db.all()
    res.json(results)
  } catch (e) {
    console.log(e)
    res.status(500)
  }

})

export { router }
