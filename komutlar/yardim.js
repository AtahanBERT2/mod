const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, emoji, args) => {

message.channel.send({embeds:[new Discord.MessageEmbed().setTitle(client.user.username + " yardım").setDescription(`
                **MODERASYON KOMUTLARI**
**.rk aç/kapat** --- (Reklam ve Küfür Engelini Açıp kapamanızı sağlar)
**.jail @üye** --- (Etiketlediğiniz üye'yi Jail'e atmanızı sağlar)
**.unjail @üye** --- (Etiketlediğiniz üye'yi Jail'den çıkartmanızı sağlar)
**.mute @üye süre** --- (Etiketlediğiniz üye'yi istediğiniz süre boyunca Mute'ler)
**.unmute @üye** --- (Etiketlediğiniz üye'yi Mute'den çıkartmanızı sağlar)
**.çek @üye** --- (Etiketlediğiniz üye'yi bulunduğunuz Ses kanalına çekmekmenizi sağlar)
**.git @üye** --- (Etiketlediğiniz üye'yi bulunduğunuz Ses kanalından göndermenizi sağlar)
**.pp @üye** --- (Etiketlediğiiz üye'nin Profil resmini gösterir)
**.ban @üye** --- (Etiketlediğiniz üye'yi Sunucunuzdan Yasaklamanızı Sağlar)
**.kick @üye** --- (Etiketlediğiniz üye'yi Sunucunuzdan Atmanızı Sağlar)
**.sil sayi** --- (Silmek istediğiniz chat konuşmaları belli bir rakam girerek silmenizi sağlar)
                   
                  **KAYIT KOMUTLARI**
**.e @üye** --- (Erkek üye Kayıt komutu'dur)
**.k @üye** --- (Kadın üye Kayıt komutu'dur)

Designed : By Escobar 

`)]})
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yardım'],
  permLevel: 0
}

exports.help = {
  name: 'help',
  description: "Etiketlenen kişiyi yanınıza çeker",
  usage: '.çek @etiket'
}