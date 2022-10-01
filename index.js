const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
require("dotenv").config();

const app = express();

// Database
dbConnection();

// Cors
app.use(cors());

// Public folder
app.use(express.static("public"));

// Read and parse JSON
app.use(express.json());

// Routes
app.use("/api/v1/bills", require("./routes/bills"));
app.use("/api/v1/auth", require("./routes/auth"));

// Listen
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
