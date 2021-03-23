const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    const filter = m => m.author.id === message.author.id;

    message.guild.members.fetch().then(async bm => {
        const mapped = bm.map(msg => msg.user.id);
        let choices = [];
        let lchoices = [];
        for (let c = 0; c < 3; c++) {
            let choice = mapped[Math.floor(Math.random() * mapped.length)];
            choices.push(choice);
            lchoices.push(`<@${choice}> - \`${choice}\``);
            const i = mapped.indexOf(choice);
            if (i > -1) {
            	mapped.splice(i, 1);
            };
        };

        let Prompt1 = new Discord.MessageEmbed()
            .setTitle("Kiss")
            .setDescription(`Of the three choices below, who would you **kiss**? Reply with the number specified next to the user.\n\n${lchoices.join("\n")}`)
            .setColor("BLUE")
            .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        message.channel.send(Prompt1).then(p1 => {
            let Kiss = new Discord.MessageCollector(p1.channel, filter, {
                max: 1,
                time: 300000
            });

            Kiss.on("collect", async kiss => {
                let kissmsg = kiss.content;
                Kiss.stop();
                
                if (!choices.includes(kissmsg)) return message.channel.send("Invalid response. Run `.kkm` to play again.");

                const ki = choices.indexOf(kissmsg);
                if (ki > -1) {
                    choices.splice(ki, 1);
                    lchoices.splice(ki, 1);
                };

                let Prompt2 = new Discord.MessageEmbed()
                    .setTitle("Kill")
                    .setDescription(`Of the two choices below, who would you **kill**? Reply with the number specified next to the user.\n\n${lchoices.join("\n")}`)
                    .setColor("BLUE")
                    .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
                    .setTimestamp();

                message.channel.send(Prompt2).then(p2 => {
                    let Kill = new Discord.MessageCollector(p2.channel, filter, {
                        max: 1,
                        time: 300000
                    });

                    Kill.on("collect", async kill => {
                        let killmsg = kill.content
                        Kill.stop();
                        
                        if (!choices.includes(killmsg)) return message.channel.send("Invalid response. Run `.kkm` to play again.");

                        const kil = choices.indexOf(killmsg);
                        if (kil > -1) {
                            choices.splice(kil, 1);
                            lchoices.splice(kil, 1);
                        };

                        let Prompt3 = new Discord.MessageEmbed()
                            .setTitle("Marry")
                            .setDescription(`Of the one choice below, who would you **marry**? Reply with the number specified next to the user.\n\n${lchoices.join("\n")}`)
                            .setColor("BLUE")
                            .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
                            .setTimestamp();

                        message.channel.send(Prompt3).then(p3 => {
                            let Marry = new Discord.MessageCollector(p3.channel, filter, {
                                max: 1,
                                time: 300000
                            });

                            Marry.on("collect", async marry => {
                                let marrymsg = marry.content;
                                Marry.stop();
                                
                                if (!choices.includes(marrymsg)) return message.channel.send("Invalid response. Run `.kkm` to play again.");

                                const m = choices.indexOf(marrymsg);
                                if (m > -1) {
                                    choices.splice(m, 1);
                                    lchoices.splice(m, 1);
                                };

                                let Prompt4 = new Discord.MessageEmbed()
                                    .setTitle("Results")
                                    .setDescription(`**Kiss:** <@${kissmsg}>\n\n**Kill:** <@${killmsg}>\n\n**Marry:** <@${marrymsg}>`)
                                    .setColor("BLUE")
                                    .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                                    .setTimestamp();

                                message.channel.send(Prompt4);
                            });
                        });
                    });
                });
            });
        });
    });
};

module.exports.help = {
    name: "kkm"
};