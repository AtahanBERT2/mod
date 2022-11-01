const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const moment = require('moment')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  
if (!message.member.roles.cache.get(ayarlar.muteyetkili) & !message.member.permissions.has("ADMINISTRATOR"))
return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]})
  
let sebep = args.splice(1).join(" ")
let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji
const kanal = message.member.voiceChannel
const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return;
if(!sebep) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir sebep belirtmelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(message.member.roles.highest.position <= member.roles.highest.position) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
message.guild.member(member.id).voice.setChannel(null)
message.react('✅')
message.channel.send({embeds:[new MessageEmbed().setDescription(`${basari} ${member} Kullancısının ${message.author} Tarafından Bağlantısı Kesildi.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#7289D')]})
  
moment.locale("tr")
let embed = new MessageEmbed()
.setColor('GRAY')
.setAuthor(`Samar`, message.guild.iconURL({dynamic: true}))
.setDescription(`${member}, adlı üye ${message.author} tarafından \`${sebep}\` sebebinden \`${moment(Date.now()).add(3,"hours").format("DD MMMM YYYY HH:mm")}\` tarihinde ses bağlantısı kesildi.`)
.setFooter(`Atahan`) 
  
client.channels.cache.get(ayarlar.modlog).send({embeds:[embed]})
}
exports.conf = { 
enabled: true, 
guildOnly: true, 
aliases: ["ses-kes"]
}

exports.help = {
name: "kes" 
}
