const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
	const difarr = [];

	bot.users.cache.forEach(user => {
		difarr.push(user);
	});

	var allmemberlen = difarr.length;
	let people = 0;
	let peopletoshow = 11;
	let mes = [];

	for (let i = 0; i < allmemberlen; i++) {
		var amount = db.fetch(`level.${difarr[i].id}`);

		if (!amount) {
			continue;
		};

		mes.push({
			name: difarr[i],
			amount: amount
		});
	};

	const realArr = [];
	mes.sort((a, b) => b.amount - a.amount);

	for (let k = 0; k < mes.length; k++) {
		people++;

		if (people >= peopletoshow) {
			continue;
		};

		realArr.push(`**${k + 1}.** ${mes[k].name} - ${mes[k].amount} XP`);
	};

	var finalLB = realArr.join("\n");

	let lbembed = new Discord.MessageEmbed()
		.setTitle("EXP Leaderboard")
		.setDescription(finalLB)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();

	message.channel.send(lbembed);
};

module.exports.help = {
	name: "leaderboard"
};