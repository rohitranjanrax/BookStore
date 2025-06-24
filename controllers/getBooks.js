import Book from '../models/bookModel.js';
import mongoose from "mongoose";

const getBooks = async(req,res)=>{
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const skip = (page-1)*limit;
        const books = await Book.find().skip(skip).limit(limit);
        const totalBooks = await Book.countDocuments();
        const totalPages = Math.ceil(totalBooks / limit);

        res.status(200).json({
            books,
            pagination: {
                currentPage: page,
                totalBooks: totalBooks,
            },
        });
    } catch (error) {
        res.status(500).json({message: 'Error fetching book',error: error.message });
    }
}

export default getBooks;