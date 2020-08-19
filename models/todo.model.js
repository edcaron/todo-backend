import { Schema as _Schema, model } from 'mongoose'

const Schema = _Schema

const todoSchema = new Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false }
}, {
  timestamps: true,
})

const Todo = model('Todo', todoSchema)

export default Todo