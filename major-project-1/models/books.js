var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

var bookSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments:[commentSchema],

    image: {
      type: String,
      required: false
    },

    category: {
      type: String,
      required: false
    },

    label: {
      type: String,
      required: false,
      default: ""
    }


}, {
    timestamps: true
});


var Books = mongoose.model('Book', bookSchema);

module.exports = Books;
