import express from 'express'
import morgan from 'morgan'
import router from './routes/auth.routes'
import cors from 'cors'

const app = express()

app.set('port', (process.env.PORT != null) || 4000)

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (_req, res) => {
  console.log('Hola mundo')
  res.send('Hello world ')
})

app.use('/api', router)

export default app
