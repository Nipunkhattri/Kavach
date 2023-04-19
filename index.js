import express from 'express'
import mongoose  from 'mongoose';
import userRouter from "./routes/user.js"
// import userCall from "./routes/Call.js"
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()

const port = 5000;

const app = express();

app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({limit:"30mb", extended: true}))
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello express ");
})

app.use("/users/",userRouter);
// app.use("/users/",userCall);


mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(port,()=>{
        console.log("server running on port 5000");
    })
}).catch((error)=>{console.log(error)})