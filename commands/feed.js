const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
    const eggs = db.get(`${message.author.id}.egg`);
    const bread = db.get(`${message.author.id}.bread`);
    let item = args.join(" ");
    let bnumber = item.split(" ")[1];

    if (!item) return message.channel.send("Please specify the number of the egg you would like to feed.");
    if (!bnumber) return message.channel.send("Please specify how much bread you would like to feed.");

    if (eggs) {
        if (item.split(" ")[0] - 1 < 0 || item.split(" ")[0] > eggs.length) return message.channel.send(`Please reply with a number between **1** and **${eggs.length}**.`);
        if (!bread || bread < bnumber) return message.channel.send("You do not have enough bread to complete this task.");

        let split1 = eggs[item.split(" ")[0] - 1].split(" ");
        let eggtype = `${split1[0]} ${split1[1]}`;
        let split2 = split1[3].split("/");
        let hatchnum = `${parseInt(split2[0]) + parseInt(bnumber)}/${split2[1]}`;

        if (split2[0] >= split2[1]) return message.channel.send(`Your egg is ready to hatch. Run \`.hatch ${item.split(" ")[0]}\` to hatch it.`);

        eggs[item.split(" ")[0] - 1] = `${eggtype} - ${hatchnum}`;
        db.set(`${message.author.id}.egg`, eggs);
        db.subtract(`${message.author.id}.bread`, parseInt(bnumber));
        
        message.channel.send(`Successfully fed ${parseInt(bnumber)} piece(s) of bread to **${eggtype}**.`);
        if ((parseInt(split2[0]) + parseInt(bnumber)) >= split2[1]) return message.channel.send(`Your egg is ready to hatch. Run \`.hatch ${item.split(" ")[0]}\` to hatch it.`);
    } else if (!eggs) {
        message.channel.send("You don't have any eggs to feed!");
    };
};

module.exports.help = {
    name: "feed"
};