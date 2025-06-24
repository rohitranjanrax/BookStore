import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true,'Title id required'],
            maxlength: [25,'connot be longer than 25 Characters'],
            minlength: [3,'connot be Shortest than 3 characters']

        },
        author:{
            type: String,
            required: [true,'Title id required'],
            maxlength: [25,'connot be longer than 25 Characters'],
            minlength: [3,'connot be Shortest than 3 characters']
        },
        genre:{
            type: String,
            required: [true,'Title id required']
        },
        publishedDate:{
            type: Number,
            required: [true,'Title id required'],
            min: [1900, 'Publication year must be later than 1900'],
            max: [new Date().getFullYear(), 'Publication year cannot be in the future'],
        }
    }    
)

const Book = mongoose.model('Book',bookSchema);

export default Book;