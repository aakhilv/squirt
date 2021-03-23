const discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to run this command.");

		const mutes = db.get(`${message.author.id}.mutems`) || 0;
		const bans = db.get(`${message.author.id}.banms`) || 0;
		const kicks = db.get(`${message.author.id}.kickms`) || 0;
		const warns = db.get(`${message.author.id}.warnms`) || 0;
		const total = mutes + bans + kicks + warns;

    let embed = new discord.MessageEmbed()
        .setTitle(`Moderation Statistics for ${message.author.tag}`)
        .addField("Mutes", mutes)
				.addField("Bans", bans)
				.addField("Kicks", kicks)
				.addField("Warns", warns)
				.addField("Total", total)
        .setColor("BLUE")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

				message.channel.send(embed);
};

module.exports.help = {
    name: "ms"
};