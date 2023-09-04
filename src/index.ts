import app from './app'
import { connectDB } from './dataBase'

void connectDB()
app.listen(app.get('port'))
console.log('Server port ', app.get('port'))
