const Discord = require("discord.js");
const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const app = require("express")();
const twit = require("twit");
const fs = require("fs");
const db = require("quick.db");
let fetch = require("node-fetch");
const Canvas = require("canvas");
const botconfig = require("./config.json");
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    };
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded.`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity(".help | QuAcK! 🦆");
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(r => r.json())
        .then(async fotd => {
        	bot.channels.cache.get("794733520458612736").send(`**Fact of the 69.420 minute:**\n> ${fotd.text.split("`").join("'")}`);
    	});
    setInterval(function() {
        fetch("https://uselessfacts.jsph.pl/random.json?language=en")
            .then(r => r.json())
            .then(async fotd => {
            	bot.channels.cache.get("794733520458612736").send(`**Fact of the 69.420 minute:**\n> ${fotd.text.split("`").join("'")}`);
        	});
    }, 4165200);
});

app.get("/", (req, res) => {
    res.send(`<link href="https://fonts.googleapis.com/css?family=Poppins:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet"><style>* { font-family: Poppins }</style><p><b>Server name:</b> ${bot.guilds.cache.get("782698303568871474").name}</p><p><b>Server owner:</b> ${bot.guilds.cache.get("782698303568871474").owner.user.tag}</p><p><b>Created on:</b> ${bot.guilds.cache.get("782698303568871474").createdAt}</p><p><b>Server region:</b> ${bot.guilds.cache.get("782698303568871474").region}</p><p><b>Total members:</b> ${bot.guilds.cache.get("782698303568871474").memberCount}</p><p><b>Total channels:</b> ${bot.guilds.cache.get("782698303568871474").channels.cache.size}</p><p><b>Server icon:</b></p><img src="${bot.guilds.cache.get("782698303568871474").iconURL({ size: 2048, dynamic: true })}">`);
});

const twitterClient = new twit({
    consumer_key: "TaaqwhHPeew6Oe9NyPOfZWrmo",
    consumer_secret: "iT7TTV5H36iTqRHR8hNkKWDaKdcFJDi1QJpAn2AEaUj3Tmjgsf",
    access_token: "1353505026556260353-1cNcpjYIMYTZC3CG5KfWP7MjClghMu",
    access_token_secret: "elZ2CMDrE3K5hZLMPEUQLVri9zA4B9iPODg7BCNT3yOR0",
});

const stream = twitterClient.stream("statuses/filter", {
    follow: "1282332365495230464"
});

stream.on("tweet", tweet => {
    if (tweet.retweeted_status ||
        tweet.in_reply_to_status_id ||
        tweet.in_reply_to_status_id_str ||
        tweet.in_reply_to_user_id ||
        tweet.in_reply_to_user_id_str ||
        tweet.in_reply_to_screen_name) return true;
    const tmsg = `Hey, **${tweet.user.screen_name}** just posted a new Tweet!\nhttps://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    bot.channels.cache.get("804934183490158612").send(tmsg);
    return false;
});

bot.on("guildMemberAdd", async member => {
    if (member.user.id == "800903576088084572") {
        return member.kick("Underage. | Horse's sister.");
    };
    
    await member.roles.add("783823188261076992");

    Canvas.registerFont("assets/Welcome.ttf", {
        family: "WelcomeFont"
    });

    const canvas = Canvas.createCanvas(1024, 500);
    const ctx = canvas.getContext("2d");

    const image = await Canvas.loadImage("./assets/Welcome.png");
    ctx.drawImage(image, 0, 0);

    ctx.fillStyle = "#0075cb";
    ctx.font = "75px WelcomeFont";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText("WELCOME!", 970, 85);
    ctx.fillStyle = "#1bb0fe";
    ctx.font = "75px WelcomeFont";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText("WELCOME!", 970, 80);

    ctx.fillStyle = "#0075cb";
    ctx.font = "63px WelcomeFont";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText(member.user.tag, 970, 160);
    ctx.fillStyle = "#1bb0fe";
    ctx.font = "63px WelcomeFont";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText(member.user.tag, 970, 155);

    const welcomeguild = bot.guilds.cache.get("782698303568871474");

    ctx.fillStyle = "#0075cb";
    ctx.font = "75px WelcomeFont";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`USER #${welcomeguild.memberCount}`, 54, 200);
    ctx.fillStyle = "#1bb0fe";
    ctx.font = "75px WelcomeFont";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(`USER #${welcomeguild.memberCount}`, 54, 195);

    ctx.beginPath();
    ctx.arc(185, 110, 75, 0, Math.PI * 2, true);
    ctx.clip();
    const pfp = await Canvas.loadImage(member.user.avatarURL({
        format: "png"
    }));
    ctx.drawImage(pfp, 110, 35, 150, 150);

    const welcomefile = new Discord.MessageAttachment(canvas.toBuffer(), "welcomecard.png");

    let msgchannel = bot.channels.cache.get("794706479370207232");
    await msgchannel.send(`<@${member.user.id}>`, welcomefile);
});

bot.on("guildMemberRemove", async member => {
    let avatar = member.user.avatarURL({
        size: 2048,
        dynamic: true
    });

    let leavembed = new Discord.MessageEmbed()
        .setAuthor(member.user.tag, avatar)
        .setDescription(`${member.user} left the server.`)
        .setColor("BLUE")
        .setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
        .setTimestamp();

    let logchannel = bot.channels.cache.get("783517585718902834");
    await logchannel.send(leavembed);
});

bot.on("message", async message => {
    if (message.channel.id === "813426389532672000") {
        const numdb = db.get("numdb");
        if (message.content == `${numdb}`) {
            db.add("numdb", 1);
            message.react("✅");
        } else if (!isNaN(message.content) && message.content != `${numdb}`) {
            db.set("numdb", 1);
            message.channel.send(`${message.author} ruined it at **${numdb-1}**! The next number is **1**.`);
            message.react("❌");
        };
    };

    if (message.channel.id === "785225096884256779") {
        message.react("⭐");
    };

    if (message.content.toLowerCase() === "f") {
        message.react("793414088751054848");
    };

    const leveldb = db.get(`level.${message.author.id}`);

    if (message.channel.id !== "782728716131369021") {
        if (!message.author.bot) {
            if (leveldb) {
                db.add(`level.${message.author.id}`, 1);
            } else if (!leveldb) {
                db.set(`level.${message.author.id}`, 100);
            };
        };
    };

    if (message.channel.type === "dm") return;
    if (!message.content.startsWith(botconfig.prefix) || message.author.bot) return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
});

bot.login(botconfig.token);
app.listen(6558);