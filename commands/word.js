const Discord = require("discord.js");
const rword = require("random-words");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    const filter = m => m.author.id === message.author.id;
    let cword = rword();

    function shuffle() {
        var a = cword.split("");
        var n = a.length;
        for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        };
        return a.join("");
    };

    let aembed = new Discord.MessageEmbed()
        .setTitle("New Word")
        .setDescription(shuffle())
        .setColor("BLUE")
        .setFooter("Word expires in 5 minutes", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let rightembed = new Discord.MessageEmbed()
        .setTitle("Correct")
        .setDescription("You got 1 crumb! Please run `.word` to get a new word!")
        .setColor("GREEN")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let wrongembed = new Discord.MessageEmbed()
        .setTitle("Wrong")
        .setDescription(`The correct word was **${cword.toLowerCase()}**. Please run \`.word\` to get a new word!`)
        .setColor("RED")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    message.channel.send(message.author, {
        embed: aembed
    }).then(p1 => {
        let Word = new Discord.MessageCollector(p1.channel, filter, {
            max: 1,
            time: 300000
        });

        Word.on("collect", async cmsg => {
            let WordMSG = cmsg.content.toLowerCase();

            if (WordMSG == cword.toLowerCase()) {
                Word.stop();
                message.channel.send(rightembed);
                db.add(`${message.author.id}.crumb`, 1);
                return;
            } else {
                Word.stop();
                message.channel.send(wrongembed);
                return;
            };
        });
    });
};

module.exports.help = {
    name: "word"
};