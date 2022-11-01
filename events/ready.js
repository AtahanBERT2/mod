const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const { joinVoiceChannel, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = async client => {

    let durum = ayarlar.durum
    let kanal =  client.channels.cache.get(ayarlar.botses)
  
    const connection = joinVoiceChannel({
      channelId: kanal.id,
      guildId: kanal.guild.id,
      adapterCreator: kanal.guild.voiceAdapterCreator
    });
    entersState(connection, VoiceConnectionStatus.Ready, 30000)
  
    client.user.setPresence({ activities: [{ name: durum }], status: "online" })
    console.log(client.user.tag + " ile giris yapildi")
  
}