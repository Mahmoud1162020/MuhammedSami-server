const express = require("express");
const router = express.Router();
const {
  getBook,
  getAllBooks,
  OrderBook,
  AddBook,
  CancelBooking,
  BookDescription,
} = require("../controller/books");

router.post("/book", getBook);
router.get("/allbooks", getAllBooks);
router.post("/book/:id", OrderBook);
router.post("/addbook", AddBook);
router.post("/cancelbooking/:id", CancelBooking);
router.post("/bookdescription/:id", BookDescription);

module.exports = router;
