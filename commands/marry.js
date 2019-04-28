const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require("snekfetch")
exports.run = async (client, message, args) => {
      if (message.mentions.users.size < 1) return message.channel.send("No te puedes casar con nadie")
      let user = message.guild.member(message.mentions.users.first());
            message.channel.send(`${user} Te has casado con ${message.author.username} ❤`,{
                embed: {
                    image: {
                        url: "https://i.imgur.com/u67QLhB.gif"
                    }
                }
            })
}
   
