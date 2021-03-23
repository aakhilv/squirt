const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You are not allowed to run this command.");

    let buser = message.mentions.users.first();
    let bnum = args.slice(1).join("");
    if (!buser) return message.channel.send("Please specify a valid user.");
    if (!bnum) return message.channel.send("Please specify how many crumbs you would like to add.");

    let enoughembed = new Discord.MessageEmbed()
        .setTitle("Success")
        .setDescription(`Successfully added ${bnum} crumb(s) to ${buser}.`)
        .setColor("BLUE")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    db.add(`${buser.id}.crumb`, bnum);
    message.channel.send(enoughembed);
};

module.exports.help = {
    name: "add"
};