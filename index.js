import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Book from "./models/bookModel";
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());// use to manage fronted and backend communication and app is a server

app.get('/',(req,res)=>{ //  ()=>{} call back function
    res.send("This is my first Backend Page");
})
app.post('/addbook',async(req,res)=>{
    const{title,author,genre,publishDate}=req.body;

    const newBook = new Book({title,author,genre,publishedDate});
    try{
        await newBook.save();
     res.status(201).json({message:"Book is added successfully"})
    }

    catch(error){
        res.status(400).json({message:"Book Couldnot be added",error:error.message});
    }

})

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database connected successfully");
    app.listen(process.env.PORT,(err)=>{
    if(err) {
        console.log("server could not run");
    }
    console.log("My server is running on port 5500 fine");
    })
})
.catch((err)=>{
    console.log("Database connection failed",err);
})