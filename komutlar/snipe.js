const { MessageEmbed } = require('discord.js')
const data = require('quick.db');
const qdb = new data.QuickDB()
const db = qdb.table("main")
const ayarlar = require('../ayarlar.json');
let basarisiz = ayarlar.basarisizemoji;

   exports.run = async(client, message, args) => {
     
if (!message.member.roles.cache.get(ayarlar.jailyetkili) & !message.member.permissions.has("ADMINISTRATOR"))
return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]})
    
    const emirhan = await db.get(`snipe.id.${message.guild.id}`)
    if(!emirhan) {
    const embeds = new MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(`${basarisiz} ${message.author}, Mesaj bulunamadı!`)
  .setColor(`#3498db`)
    message.channel.send({embeds:[embeds]});
          } else {
  let kullanıcı = client.users.cache.get(emirhan);
  const silinen = await db.get(`snipe.mesaj.${message.guild.id}`)
  const silinenk = await db.get(`snipe.kanal.${message.guild.id}`)
  const embed = new MessageEmbed()
  .setAuthor({name:`${kullanıcı.tag} (${kullanıcı.id})`, icon_url:kullanıcı.avatarURL({ dynamic: true})})
  .setDescription(silinen)
  .setColor(`#3498db`)
  .setFooter({text:(`Mesajın silindiği kanal: ${silinenk}`), iconURL:message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 })})
  .setTimestamp()
  message.channel.send({embeds:[embed]}) } 
}
exports.conf = {
    enabled:true,
    guildOnly: false,
    aliases: ['snipe'],
    permLevel: 0,
}
exports.help = {
  name: "snipe",
  description: 'Son silinen mesajı yakalar.',
  usage: 'snipe'
} 