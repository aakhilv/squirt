module.exports.run = async (bot, message, args) => {
	message.guild.fetchInvites()
		.then(invites => {
			const userInvites = invites.array().filter(o => o.inviter.id === message.author.id);
			var userInviteCount = 0;
			for (var i = 0; i < userInvites.length; i++) {
				var invite = userInvites[i];
				userInviteCount += invite["uses"];
			};
			message.reply(`you have invited ${userInviteCount} user(s).`);
		});
};

module.exports.help = {
	name: "invites"
};