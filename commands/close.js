const Discord = require("discord.js");
const fs = require("fs");
const pdf = require("pdfkit");

module.exports.run = async (bot, message, args) => {
	if (!message.member.roles.cache.find(r => r.id === "816908559484715048")) return message.channel.send("You are not allowed to run this command.");

	let logchannel = bot.channels.cache.get("817178336638926869");
    let delchannel = bot.channels.cache.get("783517585718902834");
	var str1 = message.channel.name;
	var str2 = "ticket-";

	if (str1.indexOf(str2) != -1) {
        let delembed = new Discord.MessageEmbed()
        	.setTitle("Ticket Closed")
            .addField("Ticket Number", str1.replace(str2, ""))
            .addField("Support Member", `<@${message.author.id}>`)
            .setColor("BLUE")
        	.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        	.setTimestamp();
		await message.delete();
		message.channel.messages.fetch({
			limit: 100
		}).then(async fetched => {
			fetched = fetched.array().reverse();
			const mapped = fetched.map(msg => `${msg.author.tag}: ${msg.content}`).join("\n\n");
            
            let doc = new pdf;
            doc.pipe(fs.createWriteStream("assets/transcript.pdf"));
            doc.text(`Ticket #${str1.replace(str2, "")}\n---------------------------------------------------------------------------------------------------------------------\n${mapped}`);
            doc.end();
            
			const transcriptfile = new Discord.MessageAttachment("assets/transcript.pdf", `${str1}.pdf`);
			await logchannel.send(`**Transcript for ticket #${str1.replace(str2, "")}:**`, transcriptfile);
        	await message.channel.delete();
        	await delchannel.send(delembed);
		});
	} else {
		message.channel.send("Not a ticket channel.");
	};
};

module.exports.help = {
	name: "close"
};