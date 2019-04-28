// addRole
const Discord = require("discord.js");
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");

exports.run = (client, message, args) => {
  
    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const prefixtouse = row.prefix
    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("❌ Lo lamento, no puedes hacer esto");
    if (args[0] == "help") {
        message.reply(`Uso: ${prefixtouse}addrole <user> <role>`);
        return;
    }   
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!rMember) return message.reply("Especifica un usario valido");
    let role = args.join(" ").slice(22);
    if (!role) return message.reply("Especifica un rol!");
    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return message.reply("No pude encontrar ese rol.");

    if (rMember.roles.has(gRole.id)) return message.reply("❌ Ya tiene ese rol.");
     (rMember.addRole(gRole.id));

    try {
        rMember.send(`**Felicidades**, Te han dado el rol ${gRole.name}`)
        message.channel.send("Se ha agregado el rol correctamente")

    } catch (e) {
        console.log(e.stack);
        message.channel.send(`Congrats to <@${rMember.id}>, they have been given the role ${gRole.name}. We tried to DM them, but their DMs are locked.`)
    }
})
}