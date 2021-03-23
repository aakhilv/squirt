const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    let cooldown = 8.64e+7;
    let lastDaily = db.get(`daily.${message.author.id}`);

    if (lastDaily && cooldown - (Date.now() - lastDaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastDaily), { long: true });

        let cdembed = new Discord.MessageEmbed()
            .setTitle("Cooldown")
            .setDescription(`You still have ${timeObj} left till you can get your daily reward.`)
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        message.channel.send(cdembed);
    } else {
        let dembed = new Discord.MessageEmbed()
            .setTitle("Daily Collected")
            .setDescription("Successfully collected your 10 daily crumbs. Come back in 24 hours!")
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        db.add(`${message.author.id}.crumb`, 10);
        db.set(`daily.${message.author.id}`, Date.now())
        message.channel.send(dembed);
    };
};

module.exports.help = {
    name: "daily"
};