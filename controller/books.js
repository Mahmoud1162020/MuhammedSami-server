const express = require("express");
const Books = require("../models/books");
const mongoose = require("mongoose");

// const booksData = [
//   {
//     name: "The Great Gatsby",
//     author: "F. Scott Fitzgerald",
//     description:
//       "A classic novel depicting the decadence and excess of the Jazz Age in America.",
//   },
//   {
//     name: "To Kill a Mockingbird",
//     author: "Harper Lee",
//     description:
//       "A powerful exploration of racial injustice and moral growth in the American South.",
//   },
//   {
//     name: "1984",
//     author: "George Orwell",
//     description:
//       "A dystopian masterpiece exploring the dangers of totalitarianism and surveillance.",
//   },
//   {
//     name: "Pride and Prejudice",
//     author: "Jane Austen",
//     description:
//       "A timeless romance novel satirizing societal expectations and class dynamics.",
//   },
//   {
//     name: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     description:
//       "A coming-of-age novel following the experiences of a disenchanted teenager in New York City.",
//   },
//   {
//     name: "The Hobbit",
//     author: "J.R.R. Tolkien",
//     description:
//       "An adventurous tale of Bilbo Baggins' journey to help dwarves reclaim their homeland.",
//   },
//   {
//     name: "The Da Vinci Code",
//     author: "Dan Brown",
//     description:
//       "A gripping thriller unraveling hidden secrets and mysteries related to art and religion.",
//   },
//   {
//     name: "Harry Potter and the Sorcerer's Stone",
//     author: "J.K. Rowling",
//     description:
//       "The first book in the beloved fantasy series chronicling Harry Potter's magical education.",
//   },
//   {
//     name: "The Alchemist",
//     author: "Paulo Coelho",
//     description:
//       "A philosophical novel following a young shepherd's journey in search of his personal legend.",
//   },
//   {
//     name: "The Lord of the Rings",
//     author: "J.R.R. Tolkien",
//     description:
//       "An epic fantasy trilogy detailing the quest to destroy the One Ring and defeat the Dark Lord.",
//   },
// ];

/////Books example inserted to DB
const insertBooks = async (booksData) => {
  try {
    // Insert books into the database
    const result = await Books.insertMany(booksData);
    console.log(`${result.length} books inserted successfully.`);
  } catch (error) {
    console.error("Error inserting books:", error);
  }
};
//   insertBooks();to insert books to DB just for the first time

exports.getBook = async (req, res) => {
  console.log("book route touched", req.body);
  const regex = new RegExp(req.body.name, "i");
  try {
    const book = await Books.find({ name: { $regex: regex } }).exec();
    console.log(book);
    res.json({ data: book });
  } catch (err) {}
};
exports.getAllBooks = async (req, res) => {
  console.log("allbooks route touched");
  try {
    const books = await Books.find({}).exec();
    console.log(books);
    res.json({ data: books });
  } catch (err) {
    console.log(err);
  }
};

exports.OrderBook = async (req, res) => {
  console.log("OrderBook route touched", req.params.id);

  try {
    const bookId = req.params.id;
    const filter = { _id: bookId };
    const update = { booked: true };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const books = await Books.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(books);
    res.json({ data: books });
  } catch (err) {
    console.log(err);
  }
};

exports.AddBook = async (req, res) => {
  console.log("OrderBook route touched", req.body);
  insertBooks(req.body);
};

exports.CancelBooking = async (req, res) => {
  console.log("OrderBook route touched", req.params.id, req.body.cancel);

  try {
    const bookId = req.params.id;
    const filter = { _id: bookId };
    const update = { booked: false };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const books = await Books.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(books);
    res.json({ data: books });
  } catch (err) {
    console.log(err);
  }
};

exports.BookDescription = async (req, res) => {
  console.log("OrderBook route touched", req.params.id);

  try {
    const bookId = req.params.id;
    const filter = { _id: bookId };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const books = await Books.findOne(filter).exec();
    console.log(books);
    res.json(books);
  } catch (err) {
    console.log(err);
  }
};
