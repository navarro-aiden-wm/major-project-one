var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Authors = require('../models/authors');

var authorRouter = express.Router();
authorRouter.use(bodyParser.json());

authorRouter.route('/')
.get(function (req, res, next) {
    Authors.find({}, function (err, author) {
        if (err) throw err;
        res.json(author);
    });
})

.post(function (req, res, next) {
    Authors.create(req.body, function (err, author) {
        if (err) throw err;
        console.log('Author created!');
        var id = author._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the Author with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Authors.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

authorRouter.route('/:authorId')
.get(function (req, res, next) {
    Authors.findById(req.params.authorId, function (err, author) {
        if (err) throw err;
        res.json(author);
    });
})

.put(function (req, res, next) {
    Authors.findByIdAndUpdate(req.params.authorId, {
        $set: req.body
    }, {
        new: true
    }, function (err, author) {
        if (err) throw err;
        res.json(author);
    });
})

.delete(function (req, res, next) {
    Authors.findByIdAndRemove(req.params.authorId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = authorRouter;
