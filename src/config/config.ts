import dotenv from "dotenv";

dotenv.config();

const MONGODB_USER = process.env.MONGODB_USER || "";
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || "";
const URI =  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.ymfpquo.mongodb.net/?retryWrites=true&w=majority`;
const PORT =  process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";

export default { URI, PORT, JWT_SECRET,JWT_REFRESH_SECRET };