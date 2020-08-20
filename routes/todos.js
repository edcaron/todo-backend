import express from 'express'
import TodoService from '../service/todos.service'

const router = express.Router()

const todoServiceInstance = new TodoService()

router.route('/:pageNumber?').get( async (req, res) => {
  try {
    const params = req.params

    const result = await todoServiceInstance.getTodos(params)

    return res.json(result)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

router.route('/add').post(async (req, res) => {
  try {
    const body = req.body

    const result = await todoServiceInstance.addTodo(body)

    return res.json(result)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

router.route('/:id').delete(async (req, res) => {
  try {
    const params = req.params    

    await todoServiceInstance.deleteTodoById(params)

    return res.json(true)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

router.route('/update/:id').post(async (req, res) => {
  try {
    const body = req.body

    await todoServiceInstance.updateTodo(body)

    return res.json(true)
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

export default router
