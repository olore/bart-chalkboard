const fs = require('fs');
const Mustache = require("mustache");

const html = fs.readFileSync("template.mustache").toString();
const data = {
  text: "I will go to bed on time"
}

const output = Mustache.render(html, data);

fs.writeFileSync("output.html", output);