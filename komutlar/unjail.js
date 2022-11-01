const { MessageEmbed } = require('discord.js')
const sdb = require('quick.db')
const qdb = new sdb.QuickDB()
const db = qdb.table("main")
const moment = require('moment')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {

//-------------------------------------------------------------------------------\\
  
if (!message.member.roles.cache.has(ayarlar.jailyetkili) & !message.member.permissions.has("ADMINISTRATOR"))
return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]})
  
const cezalırol = ayarlar.cezalı//Jail Rol 
const jaillog = message.guild.channels.cache.find(c => c.id === ayarlar.jaillog)//Jail Log

//-------------------------------------------------------------------------------\\

let basari = ayarlar.basariliemoji
let basarisiz = ayarlar.basarisizemoji
let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])
let sebep = args.slice(1).join(" ")
if(!kullanici) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir kullanıcı etiketlemelisin.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author}, Etiketlenen kullanıcı sizden üst/aynı pozisyondadır.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(kullanici.id === message.author.id)return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Kendine komutu kullanamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(kullanici.id === client.user.id)return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir bot üzerinde bu komutu kullanamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]})
if(kullanici.id === message.guild.ownerId) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Sunucu sahibimin üzerinde komutu kullanamazsın.`).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('0x800d0d').setTimestamp()]}) 
  
db.delete(`cezali_${message.guild.id + kullanici.id}`, 'cezali')
db.delete(`süreJail_${message.mentions.users.first().id + message.guild.id}`)

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
  
moment.locale("tr");
jaillog.send({embeds:[new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('RANDOM').setTimestamp().setDescription(`**Cezası Bitirildi !**\n**Yetkili:** ${message.author} (\`${message.author.id}\`)\n**Kullanıcı:** ${kullanici.user} (\`${kullanici.user.id}\`)\n**Sebep:** \`${sebep || "belirtilmedi"}\` \n**Tarih:** \`${moment(Date.now()).add(3,"hours").format("HH:mm:ss DD MMMM YYYY")}\``)]});
message.react('✅')

let roller = await db.get(`jail_roller_${kullanici.id}`)
if(!roller) {
kullanici.roles.set(["943997574258511953"])
}
if(roller) {
kullanici.roles.set(roller)
db.delete(`jail_roller_${kullanici.id}`)
db.delete(`jail_${kullanici.id}`)
}

  
  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unjail','ceza-kaldır','unj'],
    permLevel: 0,
}

exports.help = {
      name: "unjail"  
  
}