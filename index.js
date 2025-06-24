import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import bookRoutes from './Routes/bookRoutes.js';

dotenv.config();
//middlewares
const app = express();
app.use(express.json());// use to manage fronted and backend communication and app is a server

//route
app.use('/Book',bookRoutes); // this line is use to call the use the folder bookRoutes
app.get('/',(req,res)=>{ //  ()=>{} call back function
    res.send("This is my first Backend Page");
})

//  ******************** this codse is import to the bookRoutes in separte folder and file
// app.post('/addbook', async (req,res)=>{
//     const {title,author,genre,publishedDate} = req.body;

//     const newBook = new Book({title,author,genre,publishedDate});
//     try{
//         await newBook.save();

//         // res.status(201).send("Book is added successfully");
//         res.status(201).json({message:"Book is added successfully"})
//     }
    
//     catch(error){
//         // res.status(400).send("Book Couldnot be added");
//         res.status(400).json({message:"Book Couldnot be added",error:error.message});
//     }
// })
// DB Connection and Server Startup
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
.catch(()=>{
    console.log("Database connection failed",err);
})