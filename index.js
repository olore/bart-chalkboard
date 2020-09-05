const fs = require('fs');
const Mustache = require("mustache");

const repeat = (text, lineCount) => {
  return [...Array(lineCount).keys()].map(() => text);
}

const html = fs.readFileSync("template.mustache").toString();
const text = "I will not chew gum in class any more. Cool beans?";

let config = { 
  lineHeight: "30px",
  lineCount: 12,
};

console.log(text.length);
if (text.length <= 15) {
  config.fontSize = "40px";
} else if (text.length <= 37) {
  config.fontSize = "30px";
} else if (text.length <= 55) {
  config.fontSize = "22px";
} else {
  config.fontSize = "12px";
}

const data = {
  fontSize: config.fontSize,
  lineHeight: config.lineHeight,
  text: repeat(text, config.lineCount)
}


const output = Mustache.render(html, data);
fs.writeFileSync("output.html", output);

