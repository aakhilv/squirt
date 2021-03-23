const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first();

    if (!user) return message.channel.send("Please specify a valid user.");

    let warningnum = db.get(`${user.id}.warnings`);

    if (warningnum) {
        let warnlist = warningnum.join("\n");
        let total = warningnum.length;

        let embed = new Discord.MessageEmbed()
            .setTitle(`Warnings for ${user.tag}`)
            .addField("Number of Warnings", total)
            .addField("Warnings", warnlist)
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        message.channel.send(embed);
    } else if (!warningnum) {
        let embed = new Discord.MessageEmbed()
            .setTitle(`Warnings for ${user.tag}`)
            .addField("Number of Warnings", 0)
            .addField("Warnings", "No warnings.")
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        message.channel.send(embed);
    };
};

module.exports.help = {
    name: "warns"
};