const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send("You are not allowed to run this command.");

	let rchannel = bot.channels.cache.get("787729244922576906");

	let embed = new Discord.MessageEmbed()
		.setTitle("Server Roles")
		.setDescription("š¢ ~ Announcement Ping\nš ~ Sneak Peek Ping\nš ~ Update Ping\nš ~ Poll Ping\nš ~ Giveaway Ping\nš® ~ Game Night Ping\nš ~ Pond Event Ping\nā  ~ Raid Ping\nā ~ Revive Ping\nšØ ~ Concept Artist")
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	let msg = await rchannel.send(embed);
	msg.react("š¢").then(() => msg.react("š")).then(() => msg.react("š")).then(() => msg.react("š")).then(() => msg.react("š")).then(() => msg.react("š®")).then(() => msg.react("š")).then(() => msg.react("ā ")).then(() => msg.react("ā")).then(() => msg.react("šØ"));
};

module.exports.help = {
	name: "roles"
};