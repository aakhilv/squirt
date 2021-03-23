module.exports.run = async (bot, message, args) => {
  await message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp}ms\``);
};

module.exports.help = {
  name: "ping"
};