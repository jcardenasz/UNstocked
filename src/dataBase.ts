import mongoose from 'mongoose'
import config from './config/config'

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.DB.URI)
    console.log('DB is connected')
  } catch (error) {
    console.log(error)
  }
}

const connection = mongoose.connection
connection.once('open', () => {
  console.log('Mongodb connection established')
})

connection.on('error', err => {
  console.log(err)
  process.exit(0)
})
