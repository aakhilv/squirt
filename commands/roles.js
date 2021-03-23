const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send("You are not allowed to run this command.");

	let rchannel = bot.channels.cache.get("787729244922576906");

	let embed = new Discord.MessageEmbed()
		.setTitle("Server Roles")
		.setDescription("📢 ~ Announcement Ping\n👀 ~ Sneak Peek Ping\n📋 ~ Update Ping\n📊 ~ Poll Ping\n🎁 ~ Giveaway Ping\n🎮 ~ Game Night Ping\n🌊 ~ Pond Event Ping\n⚠ ~ Raid Ping\n❗ ~ Revive Ping\n🎨 ~ Concept Artist")
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	let msg = await rchannel.send(embed);
	msg.react("📢").then(() => msg.react("👀")).then(() => msg.react("📋")).then(() => msg.react("📊")).then(() => msg.react("🎁")).then(() => msg.react("🎮")).then(() => msg.react("🌊")).then(() => msg.react("⚠")).then(() => msg.react("❗")).then(() => msg.react("🎨"));
};

module.exports.help = {
	name: "roles"
};