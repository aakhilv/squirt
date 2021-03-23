const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let helpembed = new Discord.MessageEmbed()
		.setTitle("Help Menu")
		.addField("General", "`.help`, `.8ball`, `.invites`, `.level`, `.search`, `.verify`, `.avatar`, `.leaderboard`, `.giveaway`, `.art`, `.ping`, `.ticket`, `.word`, `.bal`, `.gift`, `.daily`, `.shop`, `.buy`, `.inv`, `.feed`, `.hatch`, `.kkm`, `.meme`")
		.addField("Moderation", "`.announce`, `.ban`, `.clearwarns`, `.kick`, `.spam`, `.warn`, `.warns`, `.purge`, `.delwarn`, `.ms`, `.close`, `.mute`, `.unmute`, `.add`")
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	message.channel.send(helpembed);
};

module.exports.help = {
	name: "help"
};