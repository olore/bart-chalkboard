const express = require('express')
const { generate } = require("./index");
const { screenshot } = require('./puppeteer');
const kebabCase = require('lodash.kebabcase');
const app = express()
const port = 8000

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log(`Request from ${req.ip}`);

  let text = req.query && req.query.s;
  if (text) {
    if (!req.query.slack) {
      console.log(`From Web: ${text}`);
    }
    res.send(generate(text));
  } else {
    res.status(400).send("Invalid request");
  }
})

app.post('/slack', async (req, res) => {
  let text = req.query && req.query.s;
  console.log(`From Slack message: ${text}`);
  console.log(`From Slack: ${req.body.team_domain} - ${req.body.user_name}`);
  const url = `https://bart.olore.net/pics/${kebabCase(req.body.text)}.png`;

  await screenshot(text);

  res.json({
    "response_type": "in_channel",
    "text": text,
    "attachments": [{
      "image_url": url
    }]

    // Maybe use this to respond in thread? - https://api.slack.com/messaging/sending#threading
    // "channel": "YOUR_CHANNEL_ID", // channel_id
    // "thread_ts": "PARENT_MESSAGE_TS",

  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
