const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

require("dotenv").config();

//Middleware
const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

//Routes
const books = require("./routes/books");
app.use("/api", books);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

//Connecting the server
app.listen(process.env.PORT, () => {
  console.log("connected to server" + process.env.PORT);
});
