/**
 * Books.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'text',
      required: true,
      unique: true
    },
    description: {
      type: 'text',
      required: true
    },
    comments:[commentSchema],

    image: {
      type: 'image',
      required: false
    },

    category: {
      type: 'text',
      required: false
    },

    label: {
      type: text,
      required: false,
      default: ""
    }
  }
};

