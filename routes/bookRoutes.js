import express from 'express';
import addBooks from '../controllers/addBooks.js';
import allBooks from '../controllers/allBooks.js';
import deleteBooks from '../controllers/deleteBooks.js';
import getBooks from '../controllers/getBooks.js';
import updatedBooks from '../controllers/updateBooks.js';

const router = express.Router();

router.post('/addbook',addBooks)
router.get('/search/:id',getBooks);
router.get('/allbooks',allBooks);
router.delete('/search/:id',deleteBooks);
router.put('/search/:id',updatedBooks );
// router.post('/addbook',addBooks)
// router.get('/addbook',getBooks);
// router.get('/allbooks',allBooks);
// router.delete('/:id', deleteBooks);
// router.put('/Book/:id', updatedBooks);


export default router;