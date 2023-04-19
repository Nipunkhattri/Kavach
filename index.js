import express from 'express'
import mongoose  from 'mongoose';
import userRouter from "./routes/user.js"
// import userCall from "./routes/Call.js"
import cors from "cors"

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

const MONGO_URL = "mongodb+srv://nipunkhattri:nipunkhattri@cluster0.4jor1xh.mongodb.net/test";

mongoose.connect(MONGO_URL).then(()=>{
    app.listen(port,()=>{
        console.log("server running on port 5000");
    })
}).catch((error)=>{console.log(error)})