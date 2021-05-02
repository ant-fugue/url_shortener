const express = require("express");
const connectDB = require("../config/db");
const app = express();
const port = 5000;

// connect to MongoDB
connectDB();

// parse request whose content-type is  application/json
app.use(express.json());

// define routes
app.use("/", require("./routes/url_redirection"));
app.use("/api/url", require("./routes/short_url_generator"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
