const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to run this command.");

	const user = message.mentions.users.first();

	if (!user) return message.channel.send("Please specify a valid user.");

	let logchannel = bot.channels.cache.get("783517585718902834");
	let warningnum = db.get(`${user.id}.warnings`);

	if (warningnum) {
		let total = warningnum.length;

		let embed = new Discord.MessageEmbed()
			.setTitle(`Cleared ${total} warning(s) for ${user.tag}`)
			.setColor("BLUE")
			.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
			.setTimestamp();

		let logembed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag} cleared ${total} warning(s) for ${user.tag}`)
			.setColor("BLUE")
			.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
			.setTimestamp();

		message.channel.send(embed);
		logchannel.send(logembed);
		db.delete(`${user.id}.warnings`);
	} else if (!warningnum) {
		let embed = new Discord.MessageEmbed()
			.setTitle(`No warnings to clear for ${user.tag}`)
			.setColor("BLUE")
			.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
			.setTimestamp();

		message.channel.send(embed);
	};
};

module.exports.help = {
	name: "clearwarns"
};