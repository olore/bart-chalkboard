const express = require('express')
const { generate } = require("./index");
const { screenshot } = require('./puppeteer');
const kebabCase = require('lodash.kebabcase');
const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'))

app.get('/', (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Request from ${ip}`);

  let text = req.query && req.query.s;
  if (text && text.length < 256) {
    if (!req.query.slack) {
      console.log(`From Web: ${text}`);
    }
    res.send(generate(text));
  } else {
    res.status(400).send("Invalid request");
  }
})

app.post('/slack', async (req, res) => {
  let text = req.body && req.body.text;
  if (text.length > 256) {
    res.status(400).send("Invalid request");
  } else {
    console.log(`From Slack message: ${text}`);
    console.log(`From Slack: ${req.body.team_domain} - ${req.body.user_name}`);
    const url = `https://bart.olore.net/pics/${kebabCase(text)}.png`;

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
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
