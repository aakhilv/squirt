const tr = new Set();
const Discord = require("discord.js");
const db = require("quick.db")

module.exports.run = async (bot, message, args) => {
	const emojis = ["🎟"];
	if (tr.has(message.author.id)) {
		message.reply("you are currently on a 10 minute cooldown.");
	} else {
		let ticketnum = db.get("ticket") || 0;
		let avatar = message.author.avatarURL({
			size: 2048,
			dynamic: true
		});

		let ticketembed = new Discord.MessageEmbed()
			.setTitle(`${message.author.tag}'s Ticket`)
			.setDescription("<@&816908559484715048> will be with you shortly. In the meantime, please explain the reason you opened this ticket.\n\n`.close` - Close ticket and save ticket transcript.")
			.setThumbnail(avatar)
			.setColor("BLUE")
			.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
			.setTimestamp();

		message.guild.channels
			.create(`ticket-${ticketnum + 1}`, {
				type: "text",
				permissionOverwrites: [{
					allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
					id: message.author.id
				},
				{
					allow: "VIEW_CHANNEL",
                    deny: "SEND_MESSAGES",
					id: "816908559484715048"
				},
				{
					deny: "VIEW_CHANNEL",
					id: message.guild.id
				}
				]
			})
			.then(channel => {
				channel.send(`<@${message.author.id}> | <@&816908559484715048>`, {
					embed: ticketembed
				}).then(async msg => {
					await msg.react(emojis[0]);

					const filtera = (reaction, user) => emojis.includes(reaction.emoji.name) && !user.bot && message.guild.members.cache.get(user.id).roles.cache.find(r => r.id === "816908559484715048");

					const options = {
						errors: ["time"],
						time: 86400000,
						max: 1
					};

					msg.awaitReactions(filtera, options)
						.then(collected => {
							const firsta = collected.first();

							if (emojis.indexOf(firsta.emoji.name) === 0) {
								msg.reactions.cache.get("🎟").users.cache.filter((u) => !u.bot && message.guild.members.cache.get(u.id).roles.cache.find(r => r.id === "816908559484715048")).forEach(user => {
									msg.channel.send(`${user} claimed this ticket.`);
									msg.channel.overwritePermissions([{
										allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
										id: message.author.id
									},
									{
										deny: "VIEW_CHANNEL",
										id: "816908559484715048"
									},
									{
										allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
										id: user.id
									},
									{
										deny: "VIEW_CHANNEL",
										id: message.guild.id
									}
									]).catch(console.log);
								});
								msg.reactions.removeAll().catch(error => console.log(error));
							};
						})
						.catch(err => {
							console.log(err)
						});
				});

				message.reply(`ticket opened in ${channel}.`);
				db.add("ticket", 1);
			});
	};

	tr.add(message.author.id);

	setTimeout(() => {
		tr.delete(message.author.id);
	}, 600000);
};

module.exports.help = {
	name: "ticket"
};