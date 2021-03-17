import { userService } from '../../dependencies/dependencyInjections.js'

test('Hashing password, success', async () => {
  const hashedPassword = await userService.hashPassword("password")
  const result = await userService.decodePassword("password", hashedPassword)
  expect(result).toBe(true)
})

test('Hashing password, fails', async () => {
  const hashedPassword = await userService.hashPassword("password")
  const result = await userService.decodePassword("invalid password", hashedPassword)
  expect(result).toBe(false)
})

test('Get user by username, success', async () => {
  const user = await userService.getUserByUsername("username")
})
