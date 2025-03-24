import express  from 'express'
import "express-async-errors"
import morgan from 'morgan'
import { errorHandler } from './modules/errorMiddleware'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/health-check', (req, res) => {
  res.send("API is running")
})

app.use(errorHandler)

export default app
