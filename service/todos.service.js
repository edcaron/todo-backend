import Todo from '../models/todo.model'

export default class TodoService {
    async getTodos (params) {
        const limit = 10	
        const page = params.pageNumber || 1
        const skip = limit * (page - 1)

        const data = await Todo.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
                
        const count = await Todo.count()
            .sort({ createdAt: -1 })
            .skip(skip + limit)
            .limit(limit)

        const hasMore = (count > 0) || false

        return {
            "data": data,
            "hasMore": hasMore
        }    
    }

    async addTodo (params) {
        const task = params.task
        const completed = params.completed

        let newTodo = new Todo({
            task,
            completed
        })

        await newTodo.save()

        return newTodo
    }

    async deleteTodoById (params){
        await Todo.findByIdAndDelete(params.id)

        return true
    }

    async updateTodo (params){
        let todo = await Todo.findById(params._id)

        todo.task = params.task
        todo.completed = params.completed

        await todo.save()

        return true
    }
}