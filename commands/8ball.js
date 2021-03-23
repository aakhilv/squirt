const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let replies = ["Yes.", "No.", "Idk.", "Ask later.", "Quack!", "Why you asking me?", "Shut up.", "ABSOLUTELY NOT!", "For sure, yes!", "Let me think again...", "You sound like Luzioh now, stop asking me stupid questions.", "<:Wut:790398250548723732>"];
	let result = Math.floor((Math.random() * replies.length));
	let question = args.join(" ");
    if (!question) return message.channel.send("Please specify a question!");

	let embed = new Discord.MessageEmbed()
		.setTitle("8 Ball")
		.addField("Question", question)
		.addField("Answer", replies[result])
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	message.channel.send(embed);
};

module.exports.help = {
	name: "8ball"
};