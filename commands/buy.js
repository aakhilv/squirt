const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    const balance = db.get(`${message.author.id}.crumb`) || 0;
    let item = args.join(" ");

    let notfound = new Discord.MessageEmbed()
        .setTitle("Not Found")
        .setDescription("The item requested was unable to be found.")
        .setColor("RED")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    if (!item) {
        return message.channel.send("Please specify what item you would like to buy.");
    } else if (item.toLowerCase() == "standard egg") {
        if (balance >= 100) {
            db.subtract(`${message.author.id}.crumb`, 100);
            db.push(`${message.author.id}.egg`, "Standard Egg - 0/3");
            message.channel.send("Successfully bought **1 Standard Egg**!");
        } else if (100 > balance) {
            message.channel.send("You do not have enough crumbs to buy the requested item!");
        };
    } else if (item.toLowerCase() == "rare egg") {
        if (balance >= 350) {
            db.subtract(`${message.author.id}.crumb`, 350);
            db.push(`${message.author.id}.egg`, "Rare Egg - 0/8");
            message.channel.send("Successfully bought **1 Rare Egg**!");
        } else if (350 > balance) {
            message.channel.send("You do not have enough crumbs to buy the requested item!");
        };
    } else if (item.toLowerCase() == "epic egg") {
        if (balance >= 500) {
            db.subtract(`${message.author.id}.crumb`, 500);
            db.push(`${message.author.id}.egg`, "Epic Egg - 0/12");
            message.channel.send("Successfully bought **1 Epic Egg**!");
        } else if (500 > balance) {
            message.channel.send("You do not have enough crumbs to buy the requested item!");
        };
    } else if (item.toLowerCase() == "mythical egg") {
        if (balance >= 750) {
            db.subtract(`${message.author.id}.crumb`, 750);
            db.push(`${message.author.id}.egg`, "Mythical Egg - 0/20");
            message.channel.send("Successfully bought **1 Mythical Egg**!");
        } else if (750 > balance) {
            message.channel.send("You do not have enough crumbs to buy the requested item!");
        };
    } else if (item.toLowerCase() == "legendary egg") {
        if (balance >= 1000) {
            db.subtract(`${message.author.id}.crumb`, 1000);
            db.push(`${message.author.id}.egg`, "Legendary Egg - 0/30");
            message.channel.send("Successfully bought **1 Legendary Egg**!");
        } else if (1000 > balance) {
            message.channel.send("You do not have enough crumbs to buy the requested item!");
        };
    } else if (item.toLowerCase() == "quack pass") {
        message.channel.send(notfound);
    } else if (item.toLowerCase().startsWith("bread")) {
        let bnumber = item.split(" ")[1];
        if (!bnumber) return message.channel.send("Please specify how much bread you would like to buy.\n\nExample: `.buy bread 100`")
        if (balance >= (50*bnumber)) {
            db.subtract(`${message.author.id}.crumb`, (50*bnumber));
            db.add(`${message.author.id}.bread`, bnumber);
            message.channel.send(`Successfully bought **${bnumber} piece(s) of bread**!`);
        } else if ((50*bnumber) > balance) {
            message.channel.send("You do not have enough crumbs to buy the requested item!");
        };
    } else {
        message.channel.send(notfound);
    };
};

module.exports.help = {
    name: "buy"
};