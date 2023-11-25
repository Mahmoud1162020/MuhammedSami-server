const express = require("express");
const Books = require("../models/books");
const mongoose = require("mongoose");

// const booksData = [
//   { name: "The Great Gatsby", author: "F. Scott Fitzgerald" },
//   { name: "To Kill a Mockingbird", author: "Harper Lee" },
//   { name: "1984", author: "George Orwell" },
//   { name: "Pride and Prejudice", author: "Jane Austen" },
//   { name: "The Catcher in the Rye", author: "J.D. Salinger" },
//   { name: "The Hobbit", author: "J.R.R. Tolkien" },
//   { name: "The Da Vinci Code", author: "Dan Brown" },
//   { name: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
//   { name: "The Alchemist", author: "Paulo Coelho" },
//   { name: "The Lord of the Rings", author: "J.R.R. Tolkien" },
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
