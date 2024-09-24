import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.USERNAME as string;
const PASSWORD = process.env.PASSWORD as string;

export const MONGO_DB_TOKEN = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.wznst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
