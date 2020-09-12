const express = require('express')
const { generate } = require("./index");
const { screenshot } = require('./puppeteer');
const kebabCase = require('lodash.kebabcase');
const app = express()
const port = 8000

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log("From Web: " + req.query.s);
  res.send(generate(req.query.s));
})

app.post('/slack', async (req, res) => {
  console.log("From Slack: " + req.body.text);
  const url = `https://bart.olore.net/pics/${kebabCase(req.body.text)}`;
  console.log(url);

  await screenshot(req.body.text);

  res.json({
    "response_type": "in_channel",
    "text": "Hello",
    "attachments": [{
      "image_url": url
    }]
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
