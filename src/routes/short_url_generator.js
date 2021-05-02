const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");

router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  // check base url
  // users may use different notations for their url
  // so this kind of validation is required...
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // generate short id
  const urlCode = shortid.generate();

  // check long url
  if (validUrl.isUri(longUrl)) {
    try {
      // check if the requested url is registered before
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url.shortUrl);
      } else {
        // base url is used to identify the user
        // create short url for each user
        const shortUrl = baseUrl + "/" + urlCode;

        // create and store the url object in the database
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        // save document in the database
        await url.save();

        res.json(url.shortUrl);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Invalid long url");
  }
});

module.exports = router;
