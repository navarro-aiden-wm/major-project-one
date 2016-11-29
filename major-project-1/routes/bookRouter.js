var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Books = require('../models/books');

var bookRouter = express.Router();
bookRouter.use(bodyParser.json());

bookRouter.route('/')
.get(function (req, res, next) {
    Books.find({}, function (err, book) {
        if (err) throw err;
        res.json(book);
    });
})

.post(function (req, res, next) {
    Books.create(req.body, function (err, book) {
        if (err) throw err;
        console.log('Books created!');
        var id = book._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the book with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Books.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

bookRouter.route('/:bookId/comments')
.get(function (req, res, next) {
    Books.findById(req.params.bookId, function (err, book) {
        if (err) throw err;
        res.json(book.comments);
    });
})

.post(function(req, res, next){
    Books.findById(req.params.bookID, function (err, book){
    if (err) throw err;
        book.comments.push(req.body);
        book.save(function (err, book){
      if (err) throw err;
      console.log("Updated Comments!");
      res.json(book);
    });
  });
})

.delete(function(req, res, next) {
    Books.findById(req.params.bookId, function (err, book) {
    if (err) throw err;
    for (var i = (book.comment.length - 1); i >= 0; i--){
        book.comments.id(book.comments[i]._id).remove();
    }
        book.save(function (err, result){
      if (err) throw err;
      res.write(200, {
        'Content-Type' : 'text/plain'
      });
        res.end('Deleted all comments!');
    });
  });
});


bookRouter.route('/:bookId')
.put(function (req, res, next) {
    Books.findById(req.params.bookId, function (err, book) {
        if (err) throw err;
        console.log('Book found!');

        Books.update({_id: book._id}, req.body, function(err, updatedBook){
          console.log(updatedBook);
          res.writeHead(200, {
              'Content-Type': 'text/plain'
          });
          res.end('Updated the book with id: ' + book._id);
        });
    });
})

.delete(function (req, res, next) {
    Books.findById(req.params.bookId, function (err, book) {
        book.remove();

       res.writeHead(200, {
           'Content-Type': 'text/plain'
       });
       res.end('Removed the book with id: ' + book._id);
   });
});


bookRouter.route('/:bookId/comments/:commentId')
.get(function (req, res, next) {
    Books.findById(req.params.bookId, function (err, book) {
       if (err) throw err;
       res.json(book.comments.id(req.params.commentId));
   });
})

.put(function (req, res, next) {

    Books.findById(req.params.bookId, function (err, book) {
       if (err) throw err;
        book.comments.id(req.params.commentId).remove();
        book.comments.push(req.body);
       console.log(req.body);
        book.save(function (err, book) {
           if (err) throw err;
           console.log('Updated Comments!');
           res.json(book);
       });
   });
})

.delete(function (req, res, next) {
    Books.findById(req.params.bookId, function (err, book) {
        book.comments.id(req.params.commentId).remove();
        book.save(function (err, resp) {
           if (err) throw err;
           res.json(resp);
       });
   });
});

module.exports = bookRouter;