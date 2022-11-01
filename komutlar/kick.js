const { MessageEmbed } = require('discord.js');
const data = require('quick.db')
const moment = require('moment')
const ayarlar = require("../ayarlar.json");
exports.run = async (client, message, args) => {
  
let basarisiz = ayarlar.basarisizemoji;//başarırız emoji
let basari = ayarlar.basariliemoji;//başarılı emoji
let yetkili = "1024942008365764609"//kick yetkili id
let kicklog1 = ayarlar.kicklog;//kicklog kanal id

//-------------------------------------------------------------------------------\\  

if (!message.member.roles.cache.has("1024942008365764609"))
return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]})
  
const kicklog = message.guild.channels.cache.find(c => c.id === kicklog1)//Kick log kanalı  
  
//-------------------------------------------------------------------------------\\


let tumaylar = {
"01": "Ocak",  
"02": "Şubat", 
"03": "Mart",  
"04": "Nisan",  
"05": "Mayıs", 
"06": "Haziran", 
"07": "Temmuz",
"08": "Ağustos", 
"09": "Eylül", 
"10": "Ekim", 
"11": "Kasım", 
"12": "Aralık", 
}
let aylar = tumaylar;  


let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let sebep = args.splice(1).join(" ")
if(!kullanici) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(!sebep) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(!kullanici.bannable)return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı atılamaz.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(kullanici.id === message.author.id)return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Kendini sunucudan atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(kullanici.id === client.user.id)return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir botu sunucudan atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(kullanici.id === message.guild.OwnerID) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sunucu sahibini sunucudan atamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
kullanici.kick({reason: sebep}).then(x => message.react('✅')).catch();
       
message.channel.send({embeds:[new MessageEmbed().setDescription(`${basari} ${message.author} tarafından ${kullanici} \`${sebep}\` Sebebiyle Sunucudan Atıldı.`).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('0x348f36').setTimestamp()]}) 
kicklog.send({embeds:[new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Sunucudan Atıldı !**\n**Kickleyen Yetkili:** ${message.author.id} (\`${message.author.id}\`)\n**Kicklenen Üye:** ${kullanici.user.tag} (\`${kullanici.user.id}\`)\n**Sebep:** \`${sebep}\`\n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\` `)]}  );
}

exports.conf = {
    aliases: ['kickle'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'kick'
  };