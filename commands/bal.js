const discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
	const balance = db.get(`${message.author.id}.crumb`) || 0;

    let embed = new discord.MessageEmbed()
        .setTitle(`${message.author.tag}'s Balance`)
        .setDescription(`You have **${balance}** crumb(s)! 🍞`)
        .setColor("BLUE")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();
    
    message.channel.send(embed);
};

module.exports.help = {
    name: "bal"
};