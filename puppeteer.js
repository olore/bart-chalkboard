const kebabCase = require('lodash.kebabcase');
const puppeteer = require('puppeteer');

const screenshot = async (text) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://bart.olore.net?slack=true&s=' + text, { waitUntil: 'networkidle2' });
  await page.screenshot({
    path: `public/pics/${kebabCase(text)}.png`,
    clip: {
      x: 10,
      y: 10,
      width: 790,
      height: 590,
    }
  });
  await browser.close();
};

exports.screenshot = screenshot;
