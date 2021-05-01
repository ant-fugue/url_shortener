const express = require("express");
const app = express();
const port = 5000;
const shortid = require("shortid");

// parse request whose content-type is  application/json
app.use(json());

app.post("/api/url/shorten", (req, res) => {
  try {
    // extract the json body from the client request and store it
    const longUrl = req.body.longUrl;
    const data = {
      longUrl: longUrl,
      shortUrl: shortid(longUrl),
      registeredTime: Date.now(),
    };
    res.send(data.shortUrl);
  } catch (e) {
    console.error(e);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
