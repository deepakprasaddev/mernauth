import express from 'express';
import path from 'path';
import dotenv from "dotenv"
dotenv.config();
import cookieParser from 'cookie-parser';
import { notFound, errorHanlder } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const PORT = process.env.PORT || 7040;
import userRoutes from "./routes/userRoutes.js"

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes)

if (process.env.NODE_ENV !== 'production') {
    app.use('/', (req, res) => {
        res.send("<h1>Server is ready</h1>");
    })
} else {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}

app.use(notFound);
app.use(errorHanlder);

app.listen(PORT, () => console.log(`Server started and listening on ${PORT}`));