const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    const eggs = db.get(`${message.author.id}.egg`);
    let item = parseInt(args);

    if (!item) return message.channel.send("Please specify the number of the egg you would like to hatch.");

    if (eggs) {
        if (item - 1 < 0 || item > eggs.length) return message.channel.send(`Please reply with a number between **1** and **${eggs.length}**.`);

        let split1 = eggs[item - 1].split(" ");
        let eggtype = `${split1[0]} ${split1[1]}`;
        let split2 = split1[3].split("/");

        if (split2[0] != split2[1]) return message.channel.send("Your egg is not ready to hatch. Please feed it more bread.");

        let Egg = new Discord.MessageEmbed()
            .setTitle(`Hatching ${eggtype}`)
            .setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819291735816929317/egg.png")
            .setColor("BLUE")
            .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
            .setTimestamp();

        let s = ["Chicken", "Pigeon", "Seagull"];
        let r = ["Duck", "Parrot", "Penguin"];
        let e = ["Eagle", "Owl", "Crow"];
        let m = ["Ostrich", "Flamingo", "Peacock"];
        let l = ["Hummingbird", "Cardinal", "Toucan"];

        let sbird = s[Math.floor(Math.random() * s.length)];
        let rbird = r[Math.floor(Math.random() * r.length)];
        let ebird = e[Math.floor(Math.random() * e.length)];
        let mbird = m[Math.floor(Math.random() * m.length)];
        let lbird = l[Math.floor(Math.random() * l.length)];

        if (eggs[item - 1].startsWith("S")) {
            let Bird = new Discord.MessageEmbed()
                .setTitle(`${eggtype} hatched into a ${sbird}!`)
                .setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819721598398890014/origami.png")
                .setColor("BLUE")
                .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                .setTimestamp();

            db.push(`${message.author.id}.bird`, sbird);
            await message.channel.send(Egg);
            await message.channel.send(Bird);
        } else if (eggs[item - 1].startsWith("R")) {
            let Bird = new Discord.MessageEmbed()
                .setTitle(`${eggtype} hatched into a ${rbird}!`)
                .setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819721598398890014/origami.png")
                .setColor("BLUE")
                .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                .setTimestamp();

            db.push(`${message.author.id}.bird`, rbird);
            await message.channel.send(Egg);
            await message.channel.send(Bird);
        } else if (eggs[item - 1].startsWith("E")) {
            let Bird = new Discord.MessageEmbed()
                .setTitle(`${eggtype} hatched into a ${ebird}!`)
                .setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819721598398890014/origami.png")
                .setColor("BLUE")
                .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                .setTimestamp();

            db.push(`${message.author.id}.bird`, ebird);
            await message.channel.send(Egg);
            await message.channel.send(Bird);
        } else if (eggs[item - 1].startsWith("M")) {
            let Bird = new Discord.MessageEmbed()
                .setTitle(`${eggtype} hatched into a ${mbird}!`)
                .setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819721598398890014/origami.png")
                .setColor("BLUE")
                .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                .setTimestamp();

            db.push(`${message.author.id}.bird`, mbird);
            await message.channel.send(Egg);
            await message.channel.send(Bird);
        } else if (eggs[item - 1].startsWith("L")) {
            let Bird = new Discord.MessageEmbed()
                .setTitle(`${eggtype} hatched into a ${lbird}!`)
                .setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819721598398890014/origami.png")
                .setColor("BLUE")
                .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
                .setTimestamp();

            db.push(`${message.author.id}.bird`, lbird);
            await message.channel.send(Egg);
            await message.channel.send(Bird);
        };
        
        if (eggs.length != 1) {
            const index = item - 1;
            if (index > -1) {
                eggs.splice(index, 1);
                db.set(`${message.author.id}.egg`, eggs);
            };
        } else if (eggs.length == 1) {
            db.delete(`${message.author.id}.egg`);
        };
    } else if (!eggs) {
        message.channel.send("You don't have any eggs to hatch!");
    };
};

module.exports.help = {
    name: "hatch"
};