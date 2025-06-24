import Book from '../models/bookModel.js';
import mongoose from "mongoose";

const addBooks = async(req,res)=>{
    const {title,author,genre,publishedDate} = req.body;

    const newBook = new Book({title,author,genre,publishedDate});
    try{
        await newBook.save();

        // res.status(201).send("Book is added successfully");
        res.status(201).json({message:"Book is added successfully"})
    }
    
    catch(error){
        // res.status(400).send("Book Couldnot be added");
        res.status(400).json({message:"Book Couldnot be added",error:error.message});
    }
}

export default addBooks;