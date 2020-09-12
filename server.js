const express = require('express')
const { generate } = require("./index");
const app = express()
const port = 8000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(generate(req.query.s));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})