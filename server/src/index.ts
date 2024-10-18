import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import ansiColors from 'ansi-colors';

import connectToMongoDB from './db/connectToDb';

import authRoutes from './routes/authRoutes';
import notesRoutes from './routes/notesRoutes';
import userRoutes from './routes/userRoutes';

dotenv.config();
const PORT = (process.env.PORT as string) || String(7001);

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(ansiColors.blue(`Server running on port: ${PORT}`));
});
