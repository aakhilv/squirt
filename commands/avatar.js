const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let user = message.mentions.users.first();

	if (!user) {
		user = message.author;
	};

	let avatar = user.avatarURL({
		size: 2048,
		dynamic: true
	});

	let aembed = new Discord.MessageEmbed()
		.setTitle(`${user.tag}'s Avatar`)
		.setImage(avatar)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	message.channel.send(aembed);
};

module.exports.help = {
	name: "avatar"
};