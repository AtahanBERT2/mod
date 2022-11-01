const sdb = require("quick.db");
const qdb = new sdb.QuickDB()
const db = qdb.table("main")
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;
let basari = ayarlar.basariliemoji;
let basarisiz = ayarlar.basarisizemoji;

exports.run = async (client, message, args) => {
if (!message.member.roles.cache.has("1024942008365764609"))
return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setTimestamp()]})
  
  if (!args[0]) {
    
return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Doğru bir argüman gir Aç veya Kapat.`).setColor('0x800d0d').setTimestamp()]})


    return;
  }
let kufur = await db.get(`kufur_${message.guild.id}`);
if (args[0] == "aç") {
if (kufur) {

return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author}, Görünüşe göre reklam koruması zaten aktif!`).setColor('0x800d0d').setTimestamp()]})

      return;
    } else {
     await db.set(`kufur_${message.guild.id}`, "Açık");

return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Reklam koruması başarıyla açıldı!`).setColor('0x348f36').setTimestamp()]})
message.react('✅')
    }
  } else if (args[0] == "kapat") {
    await db.delete(`kufur_${message.guild.id}`);

return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basari} ${message.author}, Reklam koruması başarıyla kapandı!`).setColor('0x348f36').setTimestamp()]})
message.react('✅')
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rk","reklam","küfür"],
  permLevel: 0
};

exports.help = {
  name: "reklam-küfür",
  description: "Bot",
  usage: "reklam-engel"
};