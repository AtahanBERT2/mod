const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  

    let basarili = ayarlar.basariliemoji;
    let basarisiz = ayarlar.basarisizemoji;
  
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  
  if (!uye) return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} Ses odasına gidilecek üyeyi belirtmelisin!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]});
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelId == uye.voice.channelId) return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${basarisiz} İkiniz veya ikinizden birisi ses kanalında değil!`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]});
  if (message.member.roles.cache.get("ADMINISTRATOR")) {await message.member.voice.setChannel(uye.voice.channelId);} else {
   {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send({embeds:[ new Discord.MessageEmbed().setColor('BLUE').setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} senin ses kanalına girmek için izin istiyor! Onaylıyor musun?`)]}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
	let cevap = c.first();
	if (cevap) {
	  message.member.voice.setChannel(uye.voice.channelId);
          msj.delete();
    let striga = new Discord.MessageEmbed()
.setDescription(`${basarisiz} ${uye} Odaya Çekilme Teklifini Reddetti`).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setTimestamp();
message.channel.send({embeds:[striga]})
}
})
}
      );
    };
  };
  };
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  kategori: "Yetkili Komutları",
  permLevel: 0
}

exports.help = {
  name: 'git',
  description: "Etiketlenen kişinin tüm rollerini alıp jail'e atar.",
  usage: '.jail @etiket Sebep'
}