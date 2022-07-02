
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();
//to get data in json and image encoded
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

dotenv.config();
//assigning endpoints
app.use('/posts', postRoutes);
app.use("/user", userRouter);

app.get('/', (req, res) => {
    res.send('App is Running');
})

const PORT = process.env.PORT || 5000;

//database connection

mongoose.connect(process.env.MONGODB)
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
