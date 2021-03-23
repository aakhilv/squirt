const discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to run this command.");

	const user = message.mentions.members.first();
	const time = args.slice(1).join(" ");
	let logchannel = bot.channels.cache.get("783517585718902834");

	if (!user) return message.channel.send("Please specify a valid user.");
	if (!time) return message.channel.send("Please specify a time length.");

	let warnembed = new discord.MessageEmbed()
		.setTitle("Mute Recieved")
		.addField("Length", ms(ms(time), { long: true }))
		.addField("Moderator", `<@${message.author.id}>`)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	let logembed = new discord.MessageEmbed()
		.setTitle("Mute Logged")
		.addField("User Muted", user)
		.addField("Length", ms(ms(time), { long: true }))
		.addField("Moderator", `<@${message.author.id}>`)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
	try {
		await user.send(warnembed);
	} catch {
		await message.channel.send(`Couldn't DM **${user.user.tag}** regarding this mute.`)
	};
	await user.roles.add("805007299831529493");
	await logchannel.send(logembed);
	await message.channel.send(`**${user.user.tag}** has been muted for **${ms(ms(time), { long: true })}**.`);
	await db.add(`${message.author.id}.mutems`, 1);
	setTimeout(() => {
		user.roles.remove("805007299831529493");
	}, ms(time));
};

module.exports.help = {
	name: "mute"
};