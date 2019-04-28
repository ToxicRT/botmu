// Remove Role
const Discord = require("discord.js");
const sql = require("sqlite");
sql.open("./assets/guildsettings.sqlite");

exports.run = (client, message, args) => {

    sql.get(`SELECT * FROM scores WHERE guildId ="${message.guild.id}"`).then(row => {
    const prefixtouse = row.prefix
    //if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply("❌ Lo lamento, necesitas el permiso `MANAGE_ROLES` :/");
    if (args[0]  == "help") {
        message.reply(`Uso: ${prefixtouse}removerole <user> <role>`);
        return;
    }
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!rMember) return message.reply("Especifica un usuario valido");
    let role = args.join(" ").slice(22);
    if (!role) return message.reply("Especifica un rol ");
    let gRole = message.guild.roles.find(`name`, role);
    if (!gRole) return message.reply("No pude encontrar ese rol");

    if (!rMember.roles.has(gRole.id)) return message.reply("El no tiene ese rol.");
     (rMember.removeRole(gRole.id));

    try {
         rMember.send(`You Removed the Role ${gRole.name}`)
        message.channel.send("Se ha removido el rol correctamente")
    } catch (e) {
        message.channel.send(`Bad to <@${rMember.id}>, You were ${gRole.name} from them. We tried to give them, but their DMs are blocked.`)
    }
})
}
