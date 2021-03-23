const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send("You are not allowed to run this command.");

	const deleteCount = parseInt(args[0], 10);
	if (!deleteCount || deleteCount < 1 || deleteCount > 100)
		return message.channel.send(
			"Please specify a number between 1 and 100."
		);
		
	await message.channel
		.bulkDelete(deleteCount + 1)
		.catch(error =>
			message.channel.send(`Couldn't purge messages because of: ${error}.`)
		);

	let logchannel = bot.channels.cache.get("783517585718902834");

			let logembed = new Discord.MessageEmbed()
				.setTitle("Channel Purged")
				.addField("Number of Messages", deleteCount)
				.addField("Channel", message.channel)
				.addField("Moderator", `<@${message.author.id}>`)
				.setColor("BLUE")
				.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
				.setTimestamp();

			await logchannel.send(logembed);
};

module.exports.help = {
	name: "purge"
};