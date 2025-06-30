import express from 'express';
import authroutes from './routes/AuthRoute.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/", authroutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});