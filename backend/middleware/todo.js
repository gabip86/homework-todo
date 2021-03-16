import jwt from 'jsonwebtoken'
import config from '../config.js'

export default function todoHandler(req, res, next) {
  const authHeader = req.headers['authorization']
  const accessToken = authHeader && authHeader.split(' ')[1]
  const { username } = jwt.verify(accessToken, config.secret)
  if (username !== req.user.username) {
    res.status(401).json({ message: 'Not the same user' })
  } else {
    res.status(200).json({ message: 'Same users' })
  }

  // jwt.verify(accessToken, config.secret, (err, user) => {
  //   if (err) res.status(403).json({ message: 'The token is no longer valid.' })
  //   req.user = user
  //   next()
  // })
}
