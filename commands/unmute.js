const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to run this command.");

	const user = message.mentions.members.first();
	let logchannel = bot.channels.cache.get("783517585718902834");

	if (!user) return message.channel.send("Please specify a valid user.");

	let warnembed = new discord.MessageEmbed()
		.setTitle("Unmute Recieved")
		.addField("Moderator", `<@${message.author.id}>`)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	let logembed = new discord.MessageEmbed()
		.setTitle("Unmute Logged")
		.addField("User Unmuted", user)
		.addField("Moderator", `<@${message.author.id}>`)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
	try {
		await user.send(warnembed);
	} catch {
		await message.channel.send(`Couldn't DM **${user.user.tag}** regarding this unmute.`)
	};
	await user.roles.remove("805007299831529493");
	await logchannel.send(logembed);
	await message.channel.send(`**${user.user.tag}** has been unmuted.`);
};

module.exports.help = {
	name: "unmute"
};