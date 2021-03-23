module.exports.run = async (bot, message, args) => {
	if (message.author.id !== "529850367438094357")
		return message.channel.send("You are not allowed to run this command.");

if (message.mentions.users.first()) {
	dmuser = message.mentions.users.first();

	try {
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await dmuser.send("Listen to <@529850367438094357>!");
	await message.channel.send(`Spamming ${dmuser} now.`);
} catch {
	await message.channel.send(`**${dmuser.tag}** has their DMs off.`)
};
} else {
	message.channel.send("Please specify a valid user!");
};
};

module.exports.help = {
    name: "spam"
};