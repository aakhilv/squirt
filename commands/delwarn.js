const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to run this command.");

    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ");
    let logchannel = bot.channels.cache.get("783517585718902834");

    if (!user) return message.channel.send("Please specify a valid user.");
    if (!reason) return message.channel.send("Please specify a warning number to delete.");

    let warningnum = db.get(`${user.id}.warnings`);

    if (warningnum) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Deleted warning #${reason} for ${user.tag}`)
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        let logembed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} deleted warning #${reason} for ${user.tag}`)
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        if (warningnum.length != 1) {
            const index = reason - 1;
            if (index > -1) {
                await warningnum.splice(index, 1);
                await db.set(`${user.id}.warnings`, warningnum);
            };
        } else if (warningnum.length == 1) {
            db.delete(`${user.id}.warnings`)
        };

        message.channel.send(embed);
        logchannel.send(logembed);
    } else if (!warningnum) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`No warnings to delete for ${user.tag}`)
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        message.channel.send(embed);
    };
};

module.exports.help = {
    name: "delwarn"
};