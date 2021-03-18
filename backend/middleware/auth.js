import jwt from 'jsonwebtoken'
import config from '../config.js'

export default function authHandler(req, res, next) {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  if (!accessToken) {
    res.status(401).json({ message: 'No token has been provided.' })
  } else {
    jwt.verify(accessToken, config.secret, (err, user) => {
      if (err) res.status(403).json({ message: 'The token is no longer valid.' })
      req.user = user
      next()
    })
  }
}
