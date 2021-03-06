import express from 'express'
import { db } from '../db/index.js'

const router = express.Router()

router.get('/users', async (req, res) => {
  try {
    let results = await db.getAllUser()
    res.status(200).json(results)
  } catch (e) {
    console.log(e)
    res.status(500)
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    let results = await db.getUserById(req.params.id)
    res.json(results)
  } catch (e) {
    console.log(e)
    res.status(500)
  }
})

router.post('/register', async (req, res) => {
  const username = req.body.username
  req.checkBody('username', 'Name is required').notEmpty();

  try {
    const { username, password } = req.body
    const result = await db.addNewUser({ username, password })
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
    res.status(500)
  }
})

export { router }
