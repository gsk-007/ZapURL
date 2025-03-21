import express from 'express'
import morgan from 'morgan'


const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/health-check', (req, res) => {
  res.send("API is running")
})

export default app
