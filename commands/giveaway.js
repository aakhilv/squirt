const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send("You are not allowed to run this command.");

    const filter = m => m.author.id === message.author.id;

    let Prompt1 = new Discord.MessageEmbed()
        .setTitle("Prize")
        .setDescription("Please reply with the reward that will be given away.")
        .setColor("BLUE")
        .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let Prompt2 = new Discord.MessageEmbed()
        .setTitle("Winners")
        .setDescription("Please reply with the number of winners that should be chosen.")
        .setColor("BLUE")
        .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let Prompt3 = new Discord.MessageEmbed()
        .setTitle("Length")
        .setDescription("Please reply with the time length of how long this giveaway should last.\n\n`[number]d` = Number of days.\n`[number]h` = Number of hours.\n`[number]m` = Number of minutes.")
        .setColor("BLUE")
        .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    message.channel.send(Prompt1).then(p1 => {

        let Prize = new Discord.MessageCollector(p1.channel, filter, {
            max: 1,
            time: 300000
        });

        Prize.on("collect", async collectedMessage => {
            Prize.stop();
            let prizemsg = collectedMessage.content;

            if (prizemsg.toLowerCase() === "cancel") {
                return message.channel.send("Giveaway canceled.");
            };

            message.channel.send(Prompt2).then(p2 => {
                let Winners = new Discord.MessageCollector(p2.channel, filter, {
                    max: 1,
                    time: 300000
                });

                Winners.on("collect", async collectedMessag => {
                    Winners.stop();
                    let winnermsg = collectedMessag.content;

                    if (winnermsg.toLowerCase() === "cancel") {
                        return message.channel.send("Giveaway canceled.");
                    };

                    message.channel.send(Prompt3).then(p3 => {
                        let Length = new Discord.MessageCollector(p3.channel, filter, {
                            max: 1,
                            time: 300000
                        });

                        Length.on("collect", async collectedMessa => {
                            Length.stop();
                            let lengthmsg = collectedMessa.content;

                            if (lengthmsg.toLowerCase() === "cancel") {
                                return message.channel.send("Giveaway canceled.");
                            };

                            await message.channel.send("Giveaway successfully created.");

                            let newmsg = "";

                            if (lengthmsg.endsWith("d")) {
                                newmsg = lengthmsg.replace("d", " day(s) ");
                            } else if (lengthmsg.endsWith("h")) {
                                newmsg = lengthmsg.replace("h", " hour(s) ");
                            } else if (lengthmsg.endsWith("m")) {
                                newmsg = lengthmsg.replace("m", " minute(s) ");
                            };

                            let GiveawayEmbed = new Discord.MessageEmbed()
                                .setTitle("Giveaway!")
                                .addField("Prize", prizemsg)
                                .addField("Winners", winnermsg)
                                .addField("Length", newmsg)
                                .setColor("BLUE")
                                .setFooter("React with 🎉 to enter.", "https://i.imgur.com/s7R7YC3.png")
                                .setTimestamp();

                            let gachannel = bot.channels.cache.get("787178588889546762");
                            let gamsg = await gachannel.send("<@&786311007168757790>", {
                                embed: GiveawayEmbed
                            });

                            gamsg.react("🎉");

                            setTimeout(() => {
                                var a = [];
                                gamsg.reactions.cache.get("🎉").users.cache.filter((u) => !u.bot).forEach(user => {
                                    a.push(user);
                                });

                                function genWin() {
                                    let chars = a;
                                    let out = [];
                                    for (let i = 0; i < winnermsg; i++, out.push(chars[Math.floor(Math.random() * chars.length)]));
                                    return out.join(", ");
                                };

                                gachannel.send(`${genWin()} won **${prizemsg}**!`);
                            }, ms(lengthmsg));
                        });
                    });
                });
            });
        });
    });
};

module.exports.help = {
    name: "giveaway"
};