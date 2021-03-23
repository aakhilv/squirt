const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    let eggs = db.get(`${message.author.id}.egg`);
    let birds = db.get(`${message.author.id}.bird`);
    const bread = db.get(`${message.author.id}.bread`) || 0;
    let egglength = eggs? eggs.length : 0;
    let birdlength = birds? birds.length : 0;
    let egglist = eggs? eggs.join("`, `") : "No eggs";
    let birdlist = birds? birds.join("`, `") : "No birds";

    let embed = new Discord.MessageEmbed()
        .setTitle(`${message.author.tag}'s Inventory`)
        .addField(`Eggs - ${egglength}`, `\`${egglist}\``)
        .addField(`Birds - ${birdlength}`, `\`${birdlist}\``)
        .addField("Bread", bread)
        .setColor("BLUE")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    message.channel.send(embed);
};

module.exports.help = {
    name: "inv"
};