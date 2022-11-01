const { MessageEmbed } = require('discord.js');
const util = require("util");;
const moment = require('moment');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')
let basarisiz = ayarlar.basarisizemoji
let basari = ayarlar.basariliemoji
 
exports.run = (client, message, args) => {
if (message.author.id !== "429357746002067493")
return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Komutu kullanmak için yetkin bulunmamakta.`).setColor('0x800d0d').setTimestamp()]})
    try {
    let komut = eval(args.join(" "))
    if(!komut) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${basarisiz} ${message.author}, Bir mesaj belirtmelisin.`).setColor('0x800d0d').setTimestamp()]})
    let Çıktılar = ["string","boolean","number","float"]
    if (Çıktılar.includes(typeof komut)) {
    let Embed = new MessageEmbed()
    .setDescription("**Başarılı**")
    .addFields({name:"Girdi", value:"```js\n" + args.join(" ") + "\n```"},
{name:"Çıktı", value:"```js\n" + komut + "\n```"})
    .setColor('GREEN')
    message.channel.send({embeds:[Embed]})
    message.react('✅')
    } else {
    let Embed = new MessageEmbed()
    .setDescription("**Başarılı**")
    .addFields({name:"Girdi", value:"```js\n" + args.join(" ") + "\n```"},
{name:"Çıktı", value:"```js\n" + require('util').inspect(komut) + "\n```"})
    .setColor('GREEN')
    message.channel.send({embeds:[Embed]})
    message.react('✅')
}
    } catch(err) {
     let embed = new MessageEmbed()
    .setDescription("**Hata**")
    .addFields({name:"Girdi", value:"```js\n" + args.join(" ") + "\n```"},
    {name:"Çıktı", value:"```js\n" + err + "\n```"})
    .setColor('RED')
    message.channel.send({embeds:[embed]})
    message.react('❌')

    }

};
 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
 
exports.help = {
  name: 'eval',
  description: 'Kod denemek için kullanılır.',
  usage: 'eval [kod]'
};