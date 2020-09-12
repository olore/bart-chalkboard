const express = require('express')
const { generate } = require("./index");
const app = express()
const port = 8000

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log("From Web: " + req.query.s);
  res.send(generate(req.query.s));
})

app.post('/slack', (req, res) => {
  console.log("From Slack: " + req.body.text);
  res.json({
    "response_type": "in_channel",
    "text": generate(req.body.text),
    "attachments": [{
      "image_url": "https://raw.githubusercontent.com/olore/bart-chalkboard/master/public/bart-chalkboard.png"
    }]
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
