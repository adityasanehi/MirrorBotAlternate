//The token you want to forward messages from - can be UserToken [Selfbot] or a BotToken.
let usertoken = "";
//The token you want to forward messages to channel with - you can only use a BotToken from Discord Developer Portal [https://discord.com/developers/applications]
let botoken = "";
//The channels you want to forward from (channel IDs)
let forwardfrom = [""];
//The channels you want to forward to (channel IDs)
let forwardto = [""];
//===============================================================================================
const Discord = require("discord.js-selfbot-v11");
const { Client, Intents } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const user = new Discord.Client();
user.login(usertoken);
console.log('[INITIATION EVENT] LOGGED IN ON USER/LISTENER BOT!')
user.on("ready", ready => {
  const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
  bot.login(botoken);
  console.log('[INITIATION EVENT] LOGGED IN ON FORWARDER BOT/TOKEN!')
  console.log('[LISTENER EVENT] FORWARDER RUNNING NOW!')
  user.on("message", message => {
    if (forwardfrom.includes(message.channel.id) ) {
      //forward message text
      const embed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle("New Message!")
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(message.content)
        .setTimestamp()
        .setFooter(
          "Mirror Bot - Alternate Solution by saneadi#0001",
          "https://cdn.glitch.com/4e652625-3b07-492f-b7ce-b1f8b1ab5bf0%2Fistockphoto-822836798-612x612.jpg?v=1570677107821"
        );
      forwardto.forEach(channel => {
        bot.channels.cache.get(channel).send({ embeds: [embed] });
      });
      //forward all attachments
      if (typeof message.attachments.array()[0] != "undefined") {
        var media = message.attachments.array();
        let urls = [];
        media.forEach(item => {
          urls.push(item.url);
        });
        forwardto.forEach(channel => {
          bot.channels.cache.get(channel).send("\nImages:\n" + urls.join("\n"));
        });
      }
      //forward all embeds
      message.embeds.forEach(embed1 => {
        let embedfinal = new MessageEmbed(embed1);
        console.log(embedfinal);
        embedfinal.setFooter(
          "Mirror Bot - Alternate Solution by saneadi#0001",
          "https://cdn.glitch.com/4e652625-3b07-492f-b7ce-b1f8b1ab5bf0%2Fistockphoto-822836798-612x612.jpg?v=1570677107821"
        );
        forwardto.forEach(channel => {
          bot.channels.cache.get(channel).send({ embeds: [embedfinal] });
        });
      });
    }
  });
});
