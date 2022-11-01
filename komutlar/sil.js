const { MessageEmbed }= require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require("quick.db")


exports.run = function(client, message, args) {
  
  let Sayı = args[0]
  let Mesaj = message
  let basarili = ayarlar.basariliemoji;
  let basarisiz = ayarlar.basarisizemoji;
  let yetkili = ayarlar.mod;

  
  const Hata = new MessageEmbed()
    .setColor("0x800d0d")
    .setFooter(`Atahan`, Mesaj.guild.iconURL({dynamic: true}))
    .setTimestamp();

  const Başarılı = new MessageEmbed()
    .setColor("0x348f36")
    .setFooter(`Atahan`, Mesaj.guild.iconURL({dynamic: true}))
    .setTimestamp();
 

if (!message.member.permissions.has("ADMINISTRATOR"))
return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setTimestamp()]})
  
      if (isNaN(Sayı)) {
        Hata.setDescription(`${Mesaj.author}, Bir sayı belirtiniz.`);
        Mesaj.channel.send({embeds:[Hata]})
      } else {
        if (Sayı < 101) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(Sayı);
        }
        if (Sayı > 100 && Sayı < 200) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 100);
          });
        }
        if (Sayı == 200) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 200 && Sayı < 300) {
          Başarılı.setDescription(`${Sayı} adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 200);
          });
        }
        if (Sayı == 300) {
          Başarılı.setDescription(`${Sayı} adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 300 && Sayı < 400) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 300);
          });
        }
        if (Sayı == 400) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 400 && Sayı < 500) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 400);
          });
        }
       if (Sayı == 500) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 500 && Sayı < 600) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 500);
          });
        }
        if (Sayı == 600) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 600 && Sayı < 700) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 600);
          });
        }
        if (Sayı == 700) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 700 && Sayı < 800) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 700);
          });
        }
        if (Sayı == 800) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 800 && Sayı < 900) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 800);
          });
        }
        if (Sayı == 900) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 900 && Sayı < 1000) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100).then(() => {
            Mesaj.channel.bulkDelete(Sayı - 900);
          });
        }
        if (Sayı == 1000) {
          Başarılı.setDescription(`${Mesaj.author}, **${Sayı}** adet mesaj başarıyla silindi!`);
          Mesaj.channel.send({embeds:[Başarılı]})
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
          Mesaj.channel.bulkDelete(100);
        }
        if (Sayı > 1000) {
          Hata.setDescription(`${Mesaj.author}, En fazla **1000** adet mesaj silebilirsiniz.`);
          Mesaj.channel.send({embeds:[Hata]})
        }

     
}};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["mesaj-sil", "mesajları-sil"],
  permLevel: `Mesajları yönet yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'sil',
  category: 'moderasyon',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: '.sil <miktar>'
};