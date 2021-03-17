import { userService } from '../../dependencies/dependencyInjections.js'

test('Hashing password, success', async () => {
    const hashedPassword = await userService.hashPassword("password")
    const result = await userService.decodePassword("password", hashedPassword)
    expect(result).toBe(true)
})
