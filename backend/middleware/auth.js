import jwt from 'jsonwebtoken'
import config from '../config.js'

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'No token has been provided.' })
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) res.status(403).json({ message: 'The token is no longer valid.' })
    req.user = user
    next()
  })
}
