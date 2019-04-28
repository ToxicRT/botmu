const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
const superagent = require("superagent")
module.exports = (client, guild, files) => {
        fs.readdir("./commands/", (err, files) => {
       const filez = files.length
       if (err) return console.error(err);
            console.log(`Loaded ${filez + 11} commands successfully!`)
        })
        console.log(`[READY] Logged in as ${client.user.tag}! (${client.user.id})`);
	client.setInterval(() => {
        var activities = [
            {
                "text": ">help",
                "type": "PLAYING"
            },
            {
                "text": ">settings",
                "type": "PLAYING"
            },
            {
                "text": "Andrew",
                "type": "WATCHING"
            },
            {
                "text": "over " + (Math.ceil(client.guilds.size)) + " servers.",
                "type": "WATCHING"
            },
            {
                "text": ">help - In " + (Math.ceil(client.guilds.size)) + " servers.",
                "type": "PLAYING"
            },
            {
                "text": "NETFLIX",
                "type": "WATCHING"
            }
        ]
        try {
		const activity = activities[Math.floor(Math.random() * activities.length)];
        client.user.setActivity(activity.text, { type: activity.type });
        const servercount = (Math.ceil(client.guilds.size))
        superagent.post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
            .set('Authorization', 'KEY')
            .send({
                server_count: servercount,
                shard_count: "1"
            })
            .then(console.log('Updated discordbots.org status.'))
            .catch(e => console.warn('dbots.org down spam @oliy'));
        superagent.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
            .set('Authorization', 'KEY')
            .send({
                server_count: servercount,
                shard_count: "1"
            })
            .then(console.log('Updated bots.discord.pw status.'))
            .catch(e => console.warn('bots.discord.pw down spam @oliy'));
      } catch (err) {
        return;
      }
	}, 3600000);
}