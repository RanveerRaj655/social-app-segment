import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',  authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => res.send('API running'));

app.listen(process.env.PORT || 5000, () =>
  console.log(`Server on port ${process.env.PORT || 5000}`)
);