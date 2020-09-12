const kebabCase = require('lodash.kebabcase');
const puppeteer = require('puppeteer');

const screenshot = async (text) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://bart.olore.net?s=' + text, { waitUntil: 'networkidle2' });
  await page.screenshot({
    path: `public/pics/${kebabCase(text)}.png`,
    // clip: {
    //   x: 0,
    //   y: 0,
    //   width: 100,
    //   height: 100,
    // }
  });
  await browser.close();
};

module.exports = screenshot;
