const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");

module.exports.run = async (bot, message, args) => {
	let userlevel = db.get(`level.${message.author.id}`);

	if (!userlevel) {
		userlevel = 100;
	};

	let finallevel = userlevel / 100;
	let barlevelbar = finallevel - Math.floor(finallevel);

	Canvas.registerFont("assets/Level.ttf", { family: "LevelFont" });

	const canvas = Canvas.createCanvas(600, 200);
	const ctx = canvas.getContext("2d");
	let barw = canvas.width * 0.95;
	let barh = canvas.height * 0.2;
	let lbarw = barw * (barlevelbar);

	ctx.fillStyle = "#090a0c";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = "#fcfcfc";
	ctx.font = "35px LevelFont";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";
	ctx.fillText(`Level ${Math.floor(finallevel)}`, canvas.width - 15, 50);
	ctx.font = "25px LevelFont";
	ctx.fillText(message.author.tag, canvas.width - 15, 15);

	ctx.fillStyle = "#fcfcfc";
	ctx.font = "20px LevelFont";
	ctx.textAlign = "right";
	ctx.textBaseline = "middle";
	ctx.fillText(`${userlevel - Math.floor(finallevel) * 100}/100 XP`, (canvas.width * 1.95) / 2, canvas.height / 1.75);

	ctx.fillStyle = "#474b4e";
	ctx.fillRect(canvas.width / 2 - barw / 2, canvas.height / 1.15 - barh / 1.15, barw, barh);
	ctx.fillStyle = "#3598db";
	ctx.fillRect(canvas.width / 2 - barw / 2, canvas.height / 1.15 - barh / 1.15, lbarw, barh);
    
    const pfp = await Canvas.loadImage(message.author.avatarURL({
        format: "png"
    }));
    ctx.drawImage(pfp, 15, 15, 115, 115);

	const levelfile = new Discord.MessageAttachment(canvas.toBuffer(), "level.png");

	message.channel.send(levelfile);
};

module.exports.help = {
	name: "level"
};