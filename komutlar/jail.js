const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json");
const sdb = require('quick.db');
const moment = require('moment')
const qdb = new sdb.QuickDB()
const db = qdb.table("main")


exports.run = async (client, message, args) => {
  
     
    let basarili = ayarlar.basariliemoji;
    let sebep = args.slice(1).join(" ")
    let basarisiz = ayarlar.basarisizemoji;
    let yetkili = ayarlar.jailyetkili;
    let jaillogkanal = ayarlar.jaillog;
    let cezalı = ayarlar.cezalı;
    let jailsayı = db.get(`jailsayısı_${message.author.id}`);
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason = args.slice(1).join(" ");




   if (!message.member.roles.cache.has(yetkili) & !message.member.permissions.has("ADMINISTRATOR"))
   return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setTimestamp()]})
  
   if (!member) return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} Jaile atabilmek için bir kullanıcı belirtmelisin!`).setColor('0x800d0d').setTimestamp()]})
   if (message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} Belirttiğin kişi senden üstün veya onunla aynı yetkidesin!`).setColor('0x800d0d').setTimestamp()]})
   //if(!reason) return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} Jaile atmak için sebep belirtmelisin!`).setColor('0x800d0d').setTimestamp()]})
   
  

db.set(`jail_roller_${member.id}`, member.roles.cache.map(role => role.id))
db.set(`jail_${member.id + message.guild.id}`, 'cezalı')
member.roles.cache.has("983386656969207819") ? member.roles.set(["983386656969207819", cezalı]) : member.roles.set([cezalı])

const logkanal = new Discord.MessageEmbed().setColor('RANDOM').setTimestamp().setDescription(`**Cezalandrıldı !**\n**Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Kullanıcı:** ${member.user} (\`${member.user.id}\`)\n**Sebep:** \`${sebep || "Belirtilmedi"}\` \n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\``)
client.channels.cache.get(jaillogkanal).send({embeds:[logkanal]});
db.set(`jailsayısı_${message.author.id}`, 1); 
message.react('✅')
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ceza","cezalandır"],
  permLevel: 0
}

exports.help = {
  name: 'jail',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
};