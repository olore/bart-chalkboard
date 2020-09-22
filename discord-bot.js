// Run dotenv
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const { screenshot } = require('./puppeteer');
const kebabCase = require('lodash.kebabcase');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);

client.on('message', async (msg) => {
  if (msg.content.startsWith('!bart')) {
    const text = msg.content.split("!bart")[1];
    console.log(`From Discord: ${text}`);

    const url = `https://bart.olore.net/pics/${kebabCase(text)}.png`;
    await screenshot(text);

    const attachment = new Discord.MessageAttachment(url);
    msg.channel.send(attachment);
  }
});
