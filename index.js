const fs = require('fs');
const Mustache = require("mustache");

const repeat = (text, lineCount) => {
  return [...Array(lineCount).keys()].map(() => text);
}

const html = fs.readFileSync("template.mustache").toString();

module.exports.generate = (text) => {
  let config = { 
    lineHeight: "30px",
    lineCount: 12,
  };

  if (text.length <= 15) {
    config.fontSize = "40px";
  } else if (text.length <= 35) {
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

  return Mustache.render(html, data);
}