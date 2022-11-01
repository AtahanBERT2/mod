const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const ms = require('ms');
const moment = require('moment');
const ayarlar = require('../ayarlar.json')
module.exports.run = async (client, message, args) => {
  
  
  
//-------------------------------------------------------------------------------\\

if (!message.member.roles.cache.get(ayarlar.jailyetkili) & !message.member.permissions.has("ADMINISTRATOR")) 
return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]})
  
let muterol = ayarlar.susturulmuş
let kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0])

if (!kullanici) return
  
if (args[1]) {
if (!args[1].endsWith("m") & !args[1].endsWith("s") & !args[1].endsWith("h") & !args[1].endsWith("minutes") & !args[1].endsWith("second") & !args[1].endsWith("hours")) return message.channel.send({content:"sure belirt"})

await kullanici.roles.add(muterol)
    const logkanal = new MessageEmbed().setDescription(`Başarılı bir şekilde ${kullanici} adlı kullanıcı, ${message.author.tag} tarafından \`${args[1]}\` süresi boyunca susturuldu!`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()
    client.channels.cache.get(ayarlar.mutelog).send({embeds:[logkanal]})
  
setTimeout(async() => {
  await kullanici.roles.remove(muterol)
    const logkanal = new MessageEmbed().setDescription(`Başarılı bir sekilde ${kullanici} adli kullanicinin mutesi kaldirildi!`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()
    client.channels.cache.get(ayarlar.mutelog).send({embeds:[logkanal]})
}, ms(args[1]))
} else {
  await kullanici.roles.add(muterol)
    const logkanal = new MessageEmbed().setDescription(`Başarılı bir şekilde ${kullanici} adlı kullanıcı, ${message.author.tag} tarafından susturuldu!`).setColor('0x348f36').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()
    client.channels.cache.get(ayarlar.mutelog).send({embeds:[logkanal]})
}
message.channel.send(`${kullanici} basariyla mutelenmistir`)
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
  }
  
  exports.help = {
    name: "mute"
  };