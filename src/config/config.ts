export default {
  jwtSecret: process.env.JWT_SECRET ?? 'secretToken',
  DB: {
    URI: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1/unstocked',
    USER: process.env.MONGODB_USER,
    PASSWORD: process.env.MONGODB_PASSWORD
  }
}
