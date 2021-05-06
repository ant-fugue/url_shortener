const express = require("express");
const path = require("path");
const connectDB = require("../config/db");
const app = express();
const port = 5000;

// connect to MongoDB
connectDB();

// parse request whose content-type is  application/json
app.use(express.json());

// "__dirname" returns the directory of the current file
app.use(express.static(path.join(__dirname, "public")));

// define routes
app.use("/", require("./routes/url_redirection"));
app.use("/api/url", require("./routes/short_url_generator"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
