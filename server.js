const express = require('express')
const { generate } = require("./index");
const { default: screenshot } = require('./puppeteer');
const kebabCase = require('lodash.kebabcase');
const app = express()
const port = 8000

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log("From Web: " + req.query.s);
  res.send(generate(req.query.s));
})

app.post('/slack', async (req, res) => {
  console.log("From Slack: " + req.body.text);
  await screenshot(req.body.text);
  res.json({
    "response_type": "in_channel",
    "text": "Hello",
    "attachments": [{
      "image_url": `https://bart.olore.net/${kebabCase(req.body.text)}`
    }]
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
