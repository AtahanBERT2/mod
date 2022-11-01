const ayarlar = require("../ayarlar.json");
const Discord = require("discord.js");
const db = require("quick.db");



exports.run = function(client, message, args) {
  
   

      let basarili = ayarlar.basariliemoji;
      let basarisiz = ayarlar.basarisizemoji;
      let yetkili = ayarlar.mod;

 //if (!message.member.roles.cache.get(yetkili) & !message.member.permissions.has("ADMINISTRATOR")) return
  
    const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE');
    let count = 0
      
    let textChannels = message.guild.channels.cache.filter(m => m.type == "GUILD_TEXT").size;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size

    count = count.toString().replace(/ /g, "    ").replace(/([0-9])/g, d => {
      return {
  '0': `<:emoji_74:1030774664131248210>`,
    '1': `<:emoji_77:1030774660809367602>`,
    '2': `<:emoji_75:1030774670070399036>`,
    '3': `<:emoji_76:1030774656208207952>`,
    '4': `<:emoji_78:1030774657751715860>`,                       
    '5': `<:emoji_79:1030774659345567845>`,
    '6': `<:emoji_80:1030774662461923329>`,
    '7': `<:emoji_81:1030774654463389716>`,
    '8': `<:emoji_82:1030774666039664660>`,
    '9': `<:emoji_93:1030774668216516720>`}[d];
      })

  

message.channel.send({embeds:[new Discord.MessageEmbed().setAuthor({name:`${client.user.username} • Say Menüsü`, iconURL:client.user.avatarURL()}).setDescription(`**
> Sunucuda Toplam ${message.guild.memberCount.toString().replace(/ /g, "    ").replace(/([0-9])/g, d => {
  return {
'0': `<:emoji_74:1030774664131248210>`,
'1': `<:emoji_77:1030774660809367602>`,
'2': `<:emoji_75:1030774670070399036>`,
'3': `<:emoji_76:1030774656208207952>`,
'4': `<:emoji_78:1030774657751715860>`,                       
'5': `<:emoji_79:1030774659345567845>`,
'6': `<:emoji_80:1030774662461923329>`,
'7': `<:emoji_81:1030774654463389716>`,
'8': `<:emoji_82:1030774666039664660>`,
'9': `<:emoji_93:1030774668216516720>`}[d];
  })} üye bulunuyor.

> Sunucuda toplam ${message.guild.members.cache.filter(x => x.roles.cache.has(ayarlar.erkek)).size.toString().replace(/ /g, "    ").replace(/([0-9])/g, d => {
  return {
'0': `<:emoji_74:1030774664131248210>`,
'1': `<:emoji_77:1030774660809367602>`,
'2': `<:emoji_75:1030774670070399036>`,
'3': `<:emoji_76:1030774656208207952>`,
'4': `<:emoji_78:1030774657751715860>`,                       
'5': `<:emoji_79:1030774659345567845>`,
'6': `<:emoji_80:1030774662461923329>`,
'7': `<:emoji_81:1030774654463389716>`,
'8': `<:emoji_82:1030774666039664660>`,
'9': `<:emoji_93:1030774668216516720>`}[d];
  })} erkek ${message.guild.members.cache.filter(x => x.roles.cache.has(ayarlar.kiz)).size.toString().replace(/ /g, "    ").replace(/([0-9])/g, d => {
    return {
'0': `<:emoji_74:1030774664131248210>`,
  '1': `<:emoji_77:1030774660809367602>`,
  '2': `<:emoji_75:1030774670070399036>`,
  '3': `<:emoji_76:1030774656208207952>`,
  '4': `<:emoji_78:1030774657751715860>`,                       
  '5': `<:emoji_79:1030774659345567845>`,
  '6': `<:emoji_80:1030774662461923329>`,
  '7': `<:emoji_81:1030774654463389716>`,
  '8': `<:emoji_82:1030774666039664660>`,
  '9': `<:emoji_93:1030774668216516720>`}[d];
    })} kiz ve ${message.guild.members.cache.filter(x => x.roles.cache.has(ayarlar.kayitsiz)).size.toString().replace(/ /g, "    ").replace(/([0-9])/g, d => {
    return {
'0': `<:emoji_74:1030774664131248210>`,
  '1': `<:emoji_77:1030774660809367602>`,
  '2': `<:emoji_75:1030774670070399036>`,
  '3': `<:emoji_76:1030774656208207952>`,
  '4': `<:emoji_78:1030774657751715860>`,                       
  '5': `<:emoji_79:1030774659345567845>`,
  '6': `<:emoji_80:1030774662461923329>`,
  '7': `<:emoji_81:1030774654463389716>`,
  '8': `<:emoji_82:1030774666039664660>`,
  '9': `<:emoji_93:1030774668216516720>`}[d];
    })} 
> kayıtsız üye bulunuyor.

> Ses kanallarında toplam ${count} üye bulunuyor.

> Sunucuda toplam ${message.guild.premiumSubscriptionCount.toString().replace(/ /g, "    ").replace(/([0-9])/g, d => {
  return {
'0': `<:emoji_74:1030774664131248210>`,
'1': `<:emoji_77:1030774660809367602>`,
'2': `<:emoji_75:1030774670070399036>`,
'3': `<:emoji_76:1030774656208207952>`,
'4': `<:emoji_78:1030774657751715860>`,                       
'5': `<:emoji_79:1030774659345567845>`,
'6': `<:emoji_80:1030774662461923329>`,
'7': `<:emoji_81:1030774654463389716>`,
'8': `<:emoji_82:1030774666039664660>`,
'9': `<:emoji_93:1030774668216516720>`}[d];
  })} boost bulunuyor.
**`).setFooter({text:`${message.member.user.tag} Tarafından İstendi.`}).setTimestamp().setColor("BLACK").setThumbnail("https://cdn.discordapp.com/icons/983386423392616519/a_928d80b56b49ae34fe2b4b02c1f56680.gif")]})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["istatistik"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "say",
  desscription: "say"
}; 