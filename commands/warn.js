const discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You are not allowed to run this command.");

	const user = message.mentions.users.first();
	const reason = args.slice(1).join(" ");
	let logchannel = bot.channels.cache.get("783517585718902834");
	let d = new Date();

	if (!user) return message.channel.send("Please specify a valid user.");
	if (!reason) return message.channel.send("Please enter a reason.");

	await db.push(`${user.id}.warnings`, `» ${reason} ~ <@${message.author.id}> | ${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);

	let warnembed = new discord.MessageEmbed()
		.setTitle("Warning Recieved")
		.addField("Reason", reason)
		.addField("Moderator", `<@${message.author.id}>`)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	let logembed = new discord.MessageEmbed()
		.setTitle("Warning Logged")
		.addField("User Warned", user)
		.addField("Reason", reason)
		.addField("Moderator", `<@${message.author.id}>`)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
	try {
		await user.send(warnembed);
	} catch {
		await message.channel.send(`Couldn't DM **${user.tag}** regarding this warn.`)
	};
	await logchannel.send(logembed);
	await message.channel.send(`Warning logged for **${user.tag}**.`);
	await db.add(`${message.author.id}.warnms`, 1);
};

module.exports.help = {
	name: "warn"
};