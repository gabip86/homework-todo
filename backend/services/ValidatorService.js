import joi from 'joi'
import { HttpError } from '../utils/HttpError.js'

export const schema = joi.object().options({ abortEarly: false }).keys({
  username: joi.string().min(1).required(),
  password: joi.string().min(8).required(),
})

export const validateRegisterByInputs = (inputs) => {
  try {
    joi.attempt(inputs, schema)
  } catch (e) {
    if (e.message) {
      if (e.message.includes("required")) {
        if (e.message.includes("username") && !e.message.includes("password")) {
          throw new HttpError(500, "username is required")
        } else if (e.message.includes("username") && e.message.includes("password")) {
          throw new HttpError(500, "username and password is required")
        } else if (e.message.includes("password")) {
          throw new HttpError(500, "password is required")
        }
      } else if (e.message.includes("is not allowed to be empty")) {
        throw new HttpError(500, "password should be at least 8 characters long")
      }
    }
  }
}
