const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send("You are not allowed to run this command.");

	let rchannel = bot.channels.cache.get("782700545831337994");

	let embed = new Discord.MessageEmbed()
		.setTitle("Server Rules")
		.setDescription("**Note:** 3 warns lead to a one hour muting, temporary bans last for 2-4 weeks depending on the severity.\n\n🟢 = Friendly reminder\n🟡 = Warn\n🟠 = Temp ban\n🔴 = Perm ban\n\n**1.** Anything offensive (Racism, Homophobia, sexist, etc.) posted in this server, will be prohibited. 🟡 🟠 🔴\n\n**2.** Inappropriate material such as NSFW content will NOT be tolerated on this server. 🟠 🔴\n\n**3.** Do not condone in any scamming activities. 🔴\n\n**4.** Do NOT post any offsite links that can lead to shady websites, scam websites, inappropriate content, or virus traps. (Youtube, twitter, roblox, any safe sites, are allowed). 🟠\n\n**5.** Please refrain from pinging in general. This includes pinging @everyone, @here, or simply pinging those who do not want to be pinged. 🟢 🟡 🟠 🔴\n\n**6.** Mass pinging/spam will not be tolerated. 🟠 🔴\n\n**7.** Please refrain from evading your ban (via alt accounts). 🔴\n\n**8.** Vulgar language/profanity will NOT be tolerated in this server. 🟡 🟠 🔴\n\n**9.** Please refrain from advertising (discord servers, roblox merchandise, etc.). This also goes for DM advertising. 🟡 🟠\n\n**10.** Please refrain from misusing channels and please use channels for their appropriate uses, (Ex: Use bot commands in <#782728716131369021>). 🟢 🟡\n\n**11.** Please refrain from provoking or engaging others to argue or fight (causing unnecessary drama to the server). 🟢 🟡\n\n**12.** Involvement in server raids will NOT be tolerated in this server. 🔴\n\nThese regulations are heavily enforced among the server, action will be taken against you based on the severity of the rule(s) you have violated, please abide by them, thank you.\n\nBest Regards\n- Rubber Duck Games Staff")
				.setColor("BLUE")
				.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
				.setTimestamp();

	message.channel.messages.fetch({ around: "819075217045192766", limit: 1 }).then(msg => {
		const fetchedMsg = msg.first();
		fetchedMsg.edit(embed);
	});
};

module.exports.help = {
	name: "rules"
};