const { Discord, MessageEmbed} = require('discord.js')
const sdb = require('quick.db');
const moment = require('moment')
const qdb = new sdb.QuickDB()
const db = qdb.table("erkek")
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {

    let erkekROL = ayarlar.erkek
    let fakeROL = ayarlar.fakeROL
    let kayıtsızROL = ayarlar.kayitsiz
    let kayıtlıROL = ayarlar.kayıtlıROL
    let yetkili = ayarlar.kayityetkilisi
    let kayıtLOG = ayarlar.kayıtLOG
    let kayıtsayı = db.get(`erkek.sayı_${message.author.id}_${message.guild.id}`)
    let tkayıtsayı = db.get(`toplam.sayı_${message.author.id}_${message.guild.id}`)
    let kanal = ayarlar.giriskanal;
  

    if(!message.member.roles.cache.has(yetkili) & !message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author}, Bu işlemi sadece yetkililer yapabilir`).setTimestamp()]})

if(!args[0]) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author}, Bir kişiyi etiketlemelisin.`).setTimestamp()]})

let kullanıcı = message.mentions.members.first()
if(!kullanıcı) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author}, ${args[0]}, kullanıcısını sunucuda bulamıyorum.`).setTimestamp()]})
if (kullanıcı.bot) return;
  
  
  

  
  
  
let isim = args[1]
if(!isim) return message.channel.send({embeds:[new MessageEmbed().setDescription(`${message.author}, Üyenin ismini belirtmelisin.`).setTimestamp()]})

const emb = new MessageEmbed()
.setThumbnail(client.user.avatarURL())
.setTimestamp()
let tag = ayarlar.tag || ''
message.guild.members.cache.get(kullanıcı.id).setNickname(`${isim}`)
message.guild.members.cache.get(kullanıcı.id).roles.add(erkekROL)
db.add(`erkek.sayı_${message.author.id}_${message.guild.id}`, +1)
db.add(`toplam.sayı_${message.author.id}_${message.guild.id}`, +1)
message.guild.members.cache.get(kullanıcı.id).roles.remove(kayıtsızROL)
//message.guild.members.cache.get(kullanıcı.id).send(emb.setDescription(`• Kaydın ${message.author} tarafından yapıldı. \n • **Erkek** ve **Kayıtlı** rollerini aldın. \n • Kurallar kanalımızı okumayı unutma!`))
 
let mesaj31 = `> ${kullanıcı} Aramıza Katıldı.`
let embed2 = new MessageEmbed()
.setDescription(`
• ${kullanıcı} Aramıza <@&${erkekROL}> Rolleriyle katıldı.

• Kaydı Gerçekleştiren Yetkili
> ${message.author}

• Aramıza Hoş Geldin
> ${kullanıcı}
`)

.setFooter({text:message.guild.name, iconURL:message.guild.iconURL({dynamic: true})})
.setTimestamp()


client.channels.cache.get(ayarlar.kayıtLOG).send({content:mesaj31}).then(x => setTimeout(() => x.delete(), 30000))
client.channels.cache.get(ayarlar.kayıtLOG).send({embeds:[embed2]}).then(x => setTimeout(() => x.delete(), 30000))
let embed3 = new MessageEmbed()

.setDescription(`
• ${kullanıcı} adlı kişinin kaydı başarıyla yapıldı.
• İsim • **${isim}**
• Verilen Roller • <@&${ayarlar.erkek}>
• Alınan Roller • <@&${ayarlar.kayitsiz}>`)

message.channel.send({embeds:[embed3]})
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['e'],
  permLevel: 0
};

exports.help = {
  name: 'erkek'
}