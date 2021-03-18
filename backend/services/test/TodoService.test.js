import { todoService } from '../../dependencies/dependencyInjections.js'

test('Get all todo, success', async () => {
  const result = await todoService.getAllTodo()
  expect(result).not.toBe(null)
})

test('Add new todo without inputs - throws an error', async () => {
  expect(() => todoService.addNewTodo()).toThrow(err)
})