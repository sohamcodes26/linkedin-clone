import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) =>{
    res.send("Hello you are at /")
})

app.listen(port, ()=>{
    connectDB();
    console.log(`Server started at port ${port}`)
})

