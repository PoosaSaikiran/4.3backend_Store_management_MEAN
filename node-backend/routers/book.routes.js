// now here  doing to create routes
const express = require("express");
const app = express();
const bookRoute = express.Router();
let Book = require("../model/Book");

//add Book for store
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            return next(err);
        });
});

bookRoute.route('/read-book').get((req, res, next) => {
    Book.find()
        .then(books => {
            res.json(books);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

//get book by Id
bookRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id)
        .then(book => {
            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(book);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        });
});

//update Book store 
bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then(updatedBook => {
            if (!updatedBook) {
                return next(createError(404, 'Book not found'));
            }
            res.json(updatedBook);
            console.log('Book updated successfully');
        })
        .catch(error => {
            console.error(error);
            next(error);
        });
});


//delete book store
bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            return next(err);
        });
});



module.exports = bookRoute;