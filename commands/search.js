const discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (bot, message, args) => {
    const username = args.join(" ");
    if (username) {
        fetch(`https://userapi.js.org/rbx/${username}`)
            .then(r => r.json())
            .then(ruser => {
                const rusername = ruser.name;
                let status = ruser.status;
                let description = ruser.description;
                const link = ruser.url;
                const pfp = ruser.avatar;
                const age = ruser.age;
                const regdate = ruser.created;

                let rembed = new discord.MessageEmbed()
                    .setAuthor(rusername, pfp)
                    .setThumbnail(pfp)
                    .addField("User ID", ruser.id)
                    .addField("Link", `[${link}](${link})`)
                    .addField("Status", status)
                    .addField("Description", description)
                    .addField("Account Age", `${age} year(s)`)
                    .addField("Join Date", regdate)
                    .setColor("BLUE")
                    .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                    .setTimestamp();

                message.channel.send(rembed);
            }).catch(function (err) {
                message.channel.send("Unable to find specified user.");
            });
    } else {
        message.channel.send("Please specify a valid user on Roblox.");
    };
};

module.exports.help = {
    name: "search"
};