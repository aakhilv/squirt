const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!message.member.roles.cache.find(r => r.id === "793747870481514516")) return message.channel.send("You do not have the **Concept Artist** role.")

    const filter = m => m.author.id === message.author.id;

    let Prompt1 = new Discord.MessageEmbed()
        .setTitle("Title")
        .setDescription("Please reply with the title of this concept art.")
        .setColor("BLUE")
        .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let Prompt2 = new Discord.MessageEmbed()
        .setTitle("Art")
        .setDescription("Please reply with the image of the concept art.")
        .setColor("BLUE")
        .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let artchannel = bot.channels.cache.get("785225096884256779");
    let avatar = message.author.avatarURL({
        size: 2048,
        dynamic: true
    });

    message.channel.send("Redirected prompt to your DMs. If you didn't receive a DM from me, check your privacy settings and try again.");

    message.author.send(Prompt1).then(p1 => {

        let Title = new Discord.MessageCollector(p1.channel, filter, {
            max: 1,
            time: 300000
        });

        Title.on("collect", async title => {
            Title.stop();
            let titlemsg = title.content;

            message.author.send(Prompt2).then(p2 => {

                let Art = new Discord.MessageCollector(p2.channel, filter, {
                    max: 1,
                    time: 300000
                });

                Art.on("collect", async art => {
                    Art.stop();

                    if (art.attachments.size > 0) {
                        let Attachment = (art.attachments).array();
                        let artmsg = Attachment[0].url;

                        let Prompt3 = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, avatar)
                            .setTitle(titlemsg)
                            .setImage(artmsg)
                            .setColor("BLUE")
                            .setFooter("Reply with YES or NO", "https://i.imgur.com/s7R7YC3.png")
                            .setTimestamp();

                        message.author.send("Are you sure you want to send this art?", {
                            embed: Prompt3
                        }).then(p3 => {

                            let Confirm = new Discord.MessageCollector(p3.channel, filter, {
                                max: 1,
                                time: 300000
                            });

                            Confirm.on("collect", async confirm => {
                                Confirm.stop();
                                let confirmmsg = confirm.content.toLowerCase();

                                if (confirmmsg === "yes") {
                                    let embed = new Discord.MessageEmbed()
                                        .setAuthor(message.author.tag, avatar)
                                        .setTitle(titlemsg)
                                        .setImage(artmsg)
                                        .setColor("BLUE")
                                        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                                        .setTimestamp();

                                    artchannel.send(embed);
                                    message.author.send("Concept Art sent!");
                                } else {
                                    message.author.send("Canceled.");
                                };
                            });
                        });
                    } else {
                        let artmsg = art.content;

                        let Prompt3 = new Discord.MessageEmbed()
                            .setAuthor(message.author.tag, avatar)
                            .setTitle(titlemsg)
                            .setImage(artmsg)
                            .setColor("BLUE")
                            .setFooter("Reply with YES or NO", "https://i.imgur.com/s7R7YC3.png")
                            .setTimestamp();

                        message.author.send("Are you sure you want to send this art?", {
                            embed: Prompt3
                        }).then(p3 => {

                            let Confirm = new Discord.MessageCollector(p3.channel, filter, {
                                max: 1,
                                time: 300000
                            });

                            Confirm.on("collect", async confirm => {
                                Confirm.stop();
                                let confirmmsg = confirm.content.toLowerCase();

                                if (confirmmsg === "yes") {
                                    let embed = new Discord.MessageEmbed()
                                        .setAuthor(message.author.tag, avatar)
                                        .setTitle(titlemsg)
                                        .setImage(artmsg)
                                        .setColor("BLUE")
                                        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                                        .setTimestamp();

                                    artchannel.send(embed);
                                    message.author.send("Concept Art sent!");
                                } else {
                                    message.author.send("Canceled.");
                                };
                            });
                        });
                    };
                });
            });
        });
    });
};

module.exports.help = {
    name: "art"
};