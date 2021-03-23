const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let item = args.join(" ");
    
	let embed = new Discord.MessageEmbed()
		.setTitle("Shop")
		.addField("Standard Egg", "100 crumbs", true)
    	.addField("Rare Egg", "350 crumbs", true)
    	.addField("Epic Egg", "500 crumbs", true)
    	.addField("Mythical Egg", "750 crumbs", true)
    	.addField("Legendary Egg", "1000 crumbs", true)
    	.addField("Quack Pass", "800 crumbs", true)
    	.addField("Bread", "50 crumbs", true)
		.setColor("BLUE")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    let notfound = new Discord.MessageEmbed()
		.setTitle("Not Found")
		.setDescription("The item requested was unable to be found.")
		.setColor("RED")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    let egg1 = new Discord.MessageEmbed()
		.setTitle("Standard Egg")
    	.setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819291735816929317/egg.png")
		.addField("Cost", "100 crumbs")
    	.addField("Hatching Requirements", "3 pieces of bread")
    	.addField("Possibilities", "Chicken, Pigeon, Seagull")
		.setColor("#10f7ff")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    let egg2 = new Discord.MessageEmbed()
		.setTitle("Rare Egg")
    	.setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819291735816929317/egg.png")
		.addField("Cost", "350 crumbs")
    	.addField("Hatching Requirements", "8 pieces of bread")
    	.addField("Possibilities", "Duck, Penguin, Parrot")
		.setColor("#1ef009")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    let egg3 = new Discord.MessageEmbed()
		.setTitle("Epic Egg")
    	.setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819291735816929317/egg.png")
		.addField("Cost", "500 crumbs")
    	.addField("Hatching Requirements", "12 pieces of bread")
    	.addField("Possibilities", "Eagle, Owl, Crow")
		.setColor("#ff40ff")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    let egg4 = new Discord.MessageEmbed()
		.setTitle("Mythical Egg")
    	.setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819291735816929317/egg.png")
		.addField("Cost", "750 crumbs")
    	.addField("Hatching Requirements", "20 pieces of bread")
    	.addField("Possibilities", "Ostrich, Flamingo, Peacock")
		.setColor("#fe0000")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    let egg5 = new Discord.MessageEmbed()
		.setTitle("Legendary Egg")
    	.setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819291735816929317/egg.png")
		.addField("Cost", "1000 crumbs")
    	.addField("Hatching Requirements", "30 pieces of bread")
    	.addField("Possibilities", "Hummingbird, Cardinal, Toucan")
		.setColor("#ffc501")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    let bread = new Discord.MessageEmbed()
		.setTitle("Bread")
    	.setThumbnail("https://cdn.discordapp.com/attachments/794710271029411851/819580459787747348/bread.png")
		.addField("Cost", "50 crumbs")
    	.addField("Type", "Food")
    	.addField("Function", "Increases level of egg by 1")
		.setColor("#ed8e20")
		.setFooter("Rubber Duck Games", "https://i.imgur.com/s7R7YC3.png")
		.setTimestamp();
    
    if (!item) {
        message.channel.send(embed);   
    } else if (item.toLowerCase() == "standard egg") {
        message.channel.send(egg1);
    } else if (item.toLowerCase() == "rare egg") {
        message.channel.send(egg2);
    } else if (item.toLowerCase() == "epic egg") {
        message.channel.send(egg3);
    } else if (item.toLowerCase() == "mythical egg") {
        message.channel.send(egg4);
    } else if (item.toLowerCase() == "legendary egg") {
        message.channel.send(egg5);
    } else if (item.toLowerCase() == "quack pass") {
        message.channel.send(notfound);
    } else if (item.toLowerCase() == "bread") {
        message.channel.send(bread);
    } else {
        message.channel.send(notfound);
    };
};

module.exports.help = {
	name: "shop"
};