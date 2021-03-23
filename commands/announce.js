const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send("You are not allowed to run this command.");

	let botmessage = args.join(" ");
	let pollchannel = bot.channels.cache.get("782700611866329137");

	let avatar = message.author.avatarURL({
		size: 2048,
		dynamic: true
	});

	if (!botmessage)
		return message.channel.send(
			"Please specify the message for the announcement."
		);

	let aembed = new Discord.MessageEmbed()
		.setAuthor(message.author.tag, avatar)
		.setDescription(botmessage)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	pollchannel
		.send("<@&787730376633221121>", {
			embed: aembed
		});

	message.channel.send("Announcement broadcasted.")
};

module.exports.help = {
	name: "announce"
};