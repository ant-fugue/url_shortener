const express = require("express");
const connectDB = require("../config/db");
const app = express();
const port = 5000;

// connect to MongoDB
connectDB();

// parse request whose content-type is  application/json
app.use(express.json());

// define routes
app.use("/api/url", require("../routes/url_generator"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
