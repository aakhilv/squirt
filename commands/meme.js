const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    fetch("https://reddit-meme-api.herokuapp.com")
        .then(r => r.json())
        .then(meme => {
            let embed = new Discord.MessageEmbed()
                .setTitle("Meme")
                .setImage(meme.url)
                .setColor("BLUE")
                .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                .setTimestamp();

            message.channel.send(embed);
        });
};

module.exports.help = {
    name: "meme"
};