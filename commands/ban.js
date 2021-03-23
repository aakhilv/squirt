const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You are not allowed to run that command.");

	let member = message.mentions.members.first();
	if (!member) return message.channel.send("Please specify a valid user.");
	if (!member.bannable)
		return message.channel.send(`Unable to ban ${member}.`);

	let reason = args.slice(1).join(" ");
	if (!reason) reason = "No reason provided.";

	await message.guild.members.ban(member, { reason }).then(() => {
		message.channel.send(`Successfully banned **${member}**.`);

		let logchannel = bot.channels.cache.get("783517585718902834");

		let logembed = new Discord.MessageEmbed()
			.setTitle("Member Banned")
			.addField("User Banned", member)
			.addField("Reason", reason)
			.addField("Moderator", `<@${message.author.id}>`)
			.setColor("BLUE")
			.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
			.setTimestamp();

		logchannel.send(logembed);
	});

	await db.add(`${message.author.id}.banms`, 1);
};

module.exports.help = {
	name: "ban"
};