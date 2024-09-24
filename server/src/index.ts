import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ansiColors from 'ansi-colors';

import connectToMongoDB from './db/connectToDb';

import authRoutes from './routes/authRoutes';
import notesRoutes from './routes/notesRoutes';


dotenv.config();
const PORT = (process.env.PORT as string) || 7001;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(ansiColors.blue(`Server running on port: ${PORT}`));
});
