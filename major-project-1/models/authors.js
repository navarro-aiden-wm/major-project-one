var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },

    image: {
      type: String,
      required: false
    },

    designation: {
      type: String,
      required: false,
      default: ""
    },

    abbr: {
      type: String,
      required: false
    }


}, {
    timestamps: true
});


var Authors = mongoose.model('Authors', authorsSchema);

// make this available to our Node applications
module.exports = authors;
