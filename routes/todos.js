import express from 'express'
import Todo from '../models/todo.model'

const router = express.Router();

router.route('/:pageNumber?').get( async (req, res) => {
  try {
    const limit = 10	
    const page = (req.params.pageNumber) || 1
    const skip = limit * (page - 1)

    const data = await Todo.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .catch(err => res.status(400).json('Error: ' + err))
    
    
    const count = await Todo.count()
      .sort({ createdAt: -1 })
      .skip(skip + limit)
      .limit(limit)

    const hasMore = (count > 0) || false

    res.json({
      "data": data,
      "hasMore": hasMore
    })    
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

router.route('/add').post(async (req, res) => {
  try {
    const task = req.body.task
    const completed = req.body.completed

    let newTodo = new Todo({
      task,
      completed
    })

    await newTodo.save()
    res.json(newTodo) 
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

router.route('/:id').delete(async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id)

    res.json('Todo deleted.')
  } catch (error) {
    res.status(400).json('Error: ' + error)
  }
})

router.route('/update/:id').post(async (req, res) => {
  try{
      let todo = await Todo.findById(req.body._id)

      todo.task = req.body.task
      todo.completed = req.body.completed

      await todo.save()

      res.json('updated')

    } catch (error) {
      res.status(400).json('Error: ' + error)
  }
})

export default router
