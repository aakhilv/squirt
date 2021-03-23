const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    const filter = m => m.author.id === message.author.id;

    let Prompt1 = new Discord.MessageEmbed()
        .setTitle("Username")
        .setDescription(
            "Please reply with the username of your Roblox account."
        )
        .setColor("BLUE")
        .setFooter("Prompt expires in 5 minutes.", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let NotVerified = new Discord.MessageEmbed()
        .setTitle("Not Verified")
        .setDescription(`You have not been verified.`)
        .setColor("RED")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    message.channel.send("Redirected prompt to your DMs. If you didn't receive a DM from me, check your privacy settings and try again.");

    message.author.send(Prompt1).then(p1 => {

        let Username = new Discord.MessageCollector(p1.channel, filter, {
            max: 1,
            time: 300000
        });

        Username.on("collect", async collectedMessage => {
            Username.stop();
            let usernamemsg = collectedMessage.content;

            fetch(`https://userapi.js.org/rbx/${usernamemsg}`)
                .then(r => r.json())
                .then(async ruser => {
                    const id = ruser.id;
                    const username = ruser.name;

                    function genCode() {
                        let chars = "Quack Duck RubberDuck Bread Rubber Blue Yellow ToonWorlds Duckling FatherDuck".split(" ");
                        let out = [];
                        for (let i = 0; i < 5; i++, out.push(chars[Math.floor(Math.random() * chars.length)]));
                        return out.join(" ");
                    };
                
                    const code = genCode();

                    let Prompt2 = new Discord.MessageEmbed()
                        .setTitle(`Hello ${username}`)
                        .setDescription(`To prove that you own this account, please paste the following code into your account's description:\n\`\`\`${code}\`\`\`\n**Example:**`)
                        .setImage("https://i.imgur.com/zqo5v3n.gif")
                        .setColor("BLUE")
                        .setFooter(`After pasting the code, reply with "done". | Expires in 5 minutes.`, "https://i.imgur.com/s7R7YC3.png")
                        .setTimestamp();

                    message.author.send(Prompt2).then(p2 => {
                        let Verification = new Discord.MessageCollector(p2.channel, filter, {
                            max: 1,
                            time: 300000
                        });

                        Verification.on("collect", async collectedMessag => {
                            let VerificationMSG = collectedMessag.content.toLowerCase();

                            if (VerificationMSG == "done") {
                                Verification.stop();
                                fetch(`https://userapi.js.org/rbx/${usernamemsg}`)
                                    .then(r => r.json())
                                    .then(async rruser => {
                                        const status = rruser.description;

                                        if (status === code) {
                                            let Verified = new Discord.MessageEmbed()
                                                .setTitle("Verified")
                                                .setDescription(`You are now verified as **${username}**.`)
                                                .setColor("GREEN")
                                                .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                                                .setTimestamp();

                                            message.member.roles.add("783823302224904192");
                                            message.member.setNickname(username);
                                            message.author.send(Verified);
                                        } else {
                                            message.author.send(NotVerified);
                                        };
                                    });
                            } else {
                                message.author.send(NotVerified);
                                Verification.stop();
                                return;
                            };
                        });
                    });
                });
        });
    });
};

module.exports.help = {
    name: "verify"
};