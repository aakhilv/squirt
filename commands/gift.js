const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    const balance = db.get(`${message.author.id}.crumb`) || 0;
    let buser = message.mentions.users.first();
    let bnum = args.slice(1).join("");
	if (!buser) return message.channel.send("Please specify a valid user.");
	if (!bnum) return message.channel.send("Please specify how many crumbs you would like to gift.");
    if (bnum.startsWith("-")) return message.channel.send("You can not gift a negative amount.");
    
    let enoughembed = new Discord.MessageEmbed()
        .setTitle("Gifted")
        .setDescription(`Successfully gifted ${bnum} crumb(s) to ${buser}.`)
        .setColor("BLUE")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let notenoughembed = new Discord.MessageEmbed()
        .setTitle("Not Gifted")
        .setDescription(`You do not have enough crumbs to gift to ${buser}.`)
        .setColor("BLUE")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();
    
    if (balance >= bnum) {
        db.add(`${buser.id}.crumb`, bnum);
        db.subtract(`${message.author.id}.crumb`, bnum);
        message.channel.send(enoughembed);
    } else if (bnum > balance) {
        message.channel.send(notenoughembed);
    };
};

module.exports.help = {
    name: "gift"
};