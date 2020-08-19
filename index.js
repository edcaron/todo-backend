import express, { json } from 'express'
import cors from 'cors'
import { connect, connection as _connection } from 'mongoose'
import todosRouter from './routes/todos'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(json())

const uri = process.env.ATLAS_URI
connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const connection = _connection
connection.once('open', () => {
  console.log("MongoDB database connection established successfully")
})

app.use('/todos', todosRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})