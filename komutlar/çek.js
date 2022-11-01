const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  let basarisiz = ayarlar.basarisizemoji
	let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!uye) return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription((`${basarisiz} Ses odana çekilecek üyeyi belirtmelisin!`)).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]})
  if (!message.member.voice.channel || !uye.voice.channel || message.member.voice.channelId == uye.voice.channelId) return message.channel.send({embeds:[new Discord.MessageEmbed().setDescription((`${basarisiz} Belirtilen üyenin ve kendinin ses kanalında olduğundan emin ol!`)).setColor('0x800d0d').setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setTimestamp()]})
  if (message.member.permissions.has("ADMINISTRATOR")) {await uye.voice.setChannel(message.member.voice.channelId);} else {
    const reactionFilter = (reaction, user) => {
      return ['✅'].includes(reaction.emoji.name) && user.id === uye.id;
    };
    message.channel.send({content:`${uye}`, embeds: [new Discord.MessageEmbed().setAuthor(uye.displayName, uye.user.avatarURL({dynamic: true, size: 2048})).setDescription(`${message.author} seni ses kanalına çekmek için izin istiyor! Onaylıyor musun?`)]}).then(async msj => {
      await msj.react('✅');
      msj.awaitReactions(reactionFilter, {max: 1, time: 15000, error: ['time']}).then(c => {
        let cevap = c.first();
	if (cevap) {
	  uye.voice.setChannel(message.member.voice.channelId);
	};
      });
    });
  };
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['gel'],
  permLevel: 0
}

exports.help = {
  name: 'çek',
  description: "Etiketlenen kişiyi yanınıza çeker",
  usage: '.çek @etiket'
}