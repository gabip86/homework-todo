import { userService } from '../../dependencies/dependencyInjections.js'

test('Hashing password without given password', async () => {
    const result = await userService.hashPassword()
    expect(result).toBe()
})