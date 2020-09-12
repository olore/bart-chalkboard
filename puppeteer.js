const kebabCase = require('lodash.kebabcase');
const puppeteer = require('puppeteer');

const screenshot = async (text) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://bart.olore.net?s=' + text, { waitUntil: 'networkidle2' });
  await page.screenshot({
    path: `public/pics/${kebabCase(text)}.png`,
    clip: {
      x: 0,
      y: 0,
      width: 800,
      height: 600,
    }
  });
  await browser.close();
};

exports.screenshot = screenshot;
