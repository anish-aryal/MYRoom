import express from "express";
import morgan from "morgan";
import cors from "cors";
// importing database
import mongoose from "mongoose";
import {DATABASE} from "./config.js";
import authRoutes from "./routes/auth.js";
import adRoutes from "./routes/ad.js";
import chatRoutes from "./routes/Chat.js";
import messageRoutes from "./routes/message.js";
//connecting the database
mongoose.set('strictQuery',false);
mongoose.
    connect(DATABASE).
    then(()=> console.log("My-Room Database Connected Sucessfylly")).
    catch((err)=> console.log(err));


const app = express();
//middle wares
//applying middlewares
app.use(express.json({limit:"10mb"}));
app.use(morgan("dev"));
app.use(cors());

//routes middlewares
app.use('/api',authRoutes);
app.use('/api',adRoutes);
app.use('/api',chatRoutes);
app.use('/api',messageRoutes);


app.listen(8000, ()=> console.log("Server running on port 8000"));

