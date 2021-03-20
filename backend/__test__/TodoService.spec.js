import { JsonWebTokenError } from 'jsonwebtoken'
import { todoService } from '../dependencies/dependencyInjections.js'

describe("Todo functions", () => {
  test('Get all todo, success', async () => {
    const result = await todoService.getAllTodo()
    expect(result).not.toBe(null)
  })
})
