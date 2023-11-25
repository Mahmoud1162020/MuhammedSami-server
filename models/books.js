const mongoose = require("mongoose");

// Define a Mongoose schema
const booksSchema = new mongoose.Schema({
  name: String,
  author: String,
  booked: {
    type: Boolean,
    default: false,
  },
});
const Books = mongoose.model("Books", booksSchema);
// Create a Mongoose model

module.exports = Books;
