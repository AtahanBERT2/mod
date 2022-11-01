const Discord = require('discord.js');
const client = new Discord.Client({intents: 32767});
const ayarlar = require('./ayarlar.json');
const moment = require('moment');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const sdb = require("quick.db")
const qdb = new sdb.QuickDB()
const db = qdb.table("main")
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const ms = require('ms');

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {

    let permlvl = 0;
    if (message.member.permissions.has("BAN_MEMBERS")) permlvl = 2;
    if (message.member.permissions.has("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    if (ayarlar.whitelist.includes(message.author.id)) permlvl = 5;
    return permlvl;
};


client.login(ayarlar.token);

client.off("ready", () => {
  const gir = ayarlar.botses;
  client.channels.cache.get(gir).join();
  });      

client.on('messageDelete', message => {
  if(message.author.bot === true) return;
  db.set(`snipe.kanal.${message.guild.id}`, message.channel.name)
  db.set(`snipe.mesaj.${message.guild.id}`, message.content)
  db.set(`snipe.id.${message.guild.id}`, message.author.id)
})

/////////////////////////////////////////////TAG ALANA ROL////////////////////////////////////////////////////


client.on("guildMemberAdd", async member => {
  await member.roles.add(ayarlar.kayitsiz)

  const tarih = Date.now() - member.user.createdTimestamp  
var kontrol;
if (tarih < 1296000000) kontrol = `Şüpheli`
if (tarih > 1296000000) kontrol = `Güvenilir`

  member.guild.channels.cache.get("983393192978317382").send({content:`**> <@&${ayarlar.kayityetkilisi}>, ${member} sunucuya giriş yaptı.**`, embeds:[new Discord.MessageEmbed().setAuthor({name:`Yeni Bir Kullanıcı Katıldı, 👋 ${member.user.username}`, iconURL:member.guild.iconURL({dynamic: true})})
  .setDescription(`
  **Sunucumuza hoş geldin ${member}

  Seninle birlikte ${member.guild.memberCount} kişiyiz.
  

  Kayıt olmak için yetkilileri beklemen yeterlidir.
  

  > Hesap oluşturulma tarihi: <t:${Math.trunc(member.user.createdTimestamp / 1000)}:F>
  > Güvenilirlik durumu: ${kontrol}!**`)
  .setFooter({text:client.user.username, iconURL:client.user.avatarURL()})
]})
});

////////////////////////////////////REKLAM ENGEL////////////////////////////////


client.on("messageCreate", async message => {

  let cezalı = ayarlar.cezalı
  let basarisiz = ayarlar.basarisizemoji;
  let basari = ayarlar.basariliemoji;
  let uyarisayisi = await db.get(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.get(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {  
    const jaillog = message.guild.channels.cache.find(c => c.id === ayarlar.jaillog)
    const reklam = [
      "discord.app",
      "discord.gg",
      ".gg",
      "gg/",
      ".gg/",];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
    if (message.author.bot) return
    if (ayarlar.whitelist.includes(message.author.id)) return
        message.delete();
kullanici.roles.set([cezalı])
db.set(`jail_roller_${kullanici.id}`, kullanici.roles.cache.map(role => role.id))
message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${kullanici} adlı üye discord linki yaptığı için jaile atıldı!`).setFooter(`Atahan`).setColor('GRAY')]})

const moment = require('moment')
moment.locale("tr")
let embed = new Discord.MessageEmbed()
.setColor('GRAY')

.setDescription(`${kullanici}, adlı üye \`${moment(Date.now()).add(3,"hours").format("DD MMMM YYYY HH:mm")}\` tarihinde discord linki attığı için jaile atıldı.`)
.setFooter(`Atahan`)
jaillog.send({embeds:[embed]})
      
            }}
});
        
client.on("messageCreate", async message => {

  let uyarisayisi = await db.get(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.get(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = ["abaza","gerzkılı","srfsz","şrfsz","abazan","piç","amarım","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","hoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amınako","amınakoyim","koyyim","sikem","sokam","feryadı","amını","amınoğlu","amısına","amısını","amina","aminako","aminakoyarim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amiyum","amkafa","amlarnzn","amlı","ammak","ammna","amna","amnda","amndaki","amngtn","amnn","amona","amq","amsız","amsiz","amsz","amteri","amugaa","amuğa","amuna","anaaann","analarn","anandan","ananı","ananın",
                    "dölü","ananınki","ananısikerim","sikerim","ananısikeyim","sikeyim","ananızın","anani","ananin","ananisikerim","ananisikeyim","anasını","anasının","orospu","anasi","anasinin","anay","anayin","anneni","annenin","annesiz","anuna","atkafası","atmık","attırdığım","attrrm","auzlu","ayklarmalrmsikerim","azdır","azdırıcı","babaannesi","kaşar","pezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bacy","bastard","beyinsiz","bızır","bitch","biting","bosalmak","boşalmak","cibilliyetini","cibilliyetsiz","çük","dalaksız","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dkerim","domal","domalan",
                    "domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dönek","eben","ebeni","ebenin","ebeninki","ebleh","ecdadını","ecdadini","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibiş","gibmek","gibtiler","goddamn","godoş","godumun","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotveren","goyiim","goyum","goyuyim","goyyim","göt","deliği","götelek","götlalesi","götlek","götoğlanı","oğlanı","götoş","götten","götü","götün","götüne","götünekoyim","koyim","götünü","götveren","gtelek","gtn","gtnde","gtnden","gtne",
                    "gtten","gtveren","hasiktir","hassiktir","siktir","hödük","hsktr","huur","ıbnelık","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","ipne","iserim","işerim","itoğlu","kahpe","kahpenin","kaltak","kancık","kancik","kappe","karhane","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","kevaşe","kevvase","koduğmun","koduğmunun","kodumun","kodumunun","koduumun","koyarm","koyiim","koyiiym","koyum","kukudaym","laciye","liboş","madafaka","malafat","mcik","meme","memelerini","mezveleli","minaamcık","mincikliyim","monakkoluyum","motherfucker","mudik","ocuun","oğlancı","orosbucocuu",
                    "orospucocugu","cocugu","orospuçocuğu","çocuğudur","çocukları","orospudur","orospular","orospunun","evladı","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspuçocuğu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","öşex","patlak","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin","pezo","pic","pici","picler","piç","piçin","kurusu","piçler","pipi","pipiş","porno","pussy","puşttur","rahminde","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","sevişelim","sexs","sıçarım","sıçtığım","sıecem","sicarsin","sikdi","sikdiğim","sike","sikecem","siken","sikenin","siker","sikerler","sikersin","sikertir","sikertmek",
                    "sikesen","sikesicenin","sikey","sikeydim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt",
                    "sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktirgit","siktirir","siktiririm","siktiriyor","siktirolgit","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skime","skmek","sksin","sktiimin","sktrr","skyim","slaleni","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülaleni","sülalenizi","sürtük","şıllık","taaklarn","taaklarna","tarrakimin","tasak","tassak","taşak","taşşak","s.k","tipinizi","s.keyim","tiyniyat","toplarm","topsun","totoş","vajina","vajinanı","veled","veledizina","zina",
                    "verdiimin","weled","weledizina","whore","oç","xikeyim","yaaraaa","yalama","yalarım","yalarun","yaraaam","yarak","yaraksız","yaraktr","yaraminbasi","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yogurtlayam","yoğurtlayam","yrrak","zıkkımım","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini","skrm","büzük","büzüğ","siksokçu","siksokcu","sksokcu","siksoker","siksokker","siksoke","sıksoker","sıksokcu","sıksokçu","sıksok","siksocer","sksocer","oçe","yarramı","amcı","amcıyım","amguard","skym","o.ç","anskym","anaskym","anasikim","anskim","anasikm"
]
        
    const reklam2 =  ["abaza","gerzkılı","srfsz","şrfsz","abazan","piç","amarım","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","hoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoyim","koyyim","sikem","sokam","feryadı","amını","amınoğlu","amısına","amısını","amina","aminako","aminakoyarim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amiyum","amkafa","amlarnzn","amlı","ammak","ammna","amna","amnda","amndaki","amngtn","amnn","amona","amq","amsız","amsiz","amsz","amteri","amugaa","amuğa","amuna","anaaann","analarn","anandan","ananı","ananın",
                    "dölü","ananınki","ananısikerim","sikerim","ananısikeyim","sikeyim","ananızın","anani","ananin","ananisikerim","ananisikeyim","anasını","anasının","orospu","anasi","anasinin","anay","anayin","anneni","annenin","annesiz","anuna","atkafası","atmık","attırdığım","attrrm","auzlu","ayklarmalrmsikerim","azdır","azdırıcı","babaannesi","kaşar","pezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bacy","bastard","beyinsiz","bızır","bitch","biting","bosalmak","boşalmak","cibilliyetini","cibilliyetsiz","çük","dalaksız","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dkerim","domal","domalan",
                    "domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dönek","eben","ebeni","ebenin","ebeninki","ebleh","ecdadını","ecdadini","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibiş","gibmek","gibtiler","goddamn","godoş","godumun","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotveren","goyiim","goyum","goyuyim","goyyim","göt","deliği","götelek","götlalesi","götlek","götoğlanı","oğlanı","götoş","götten","götü","götün","götüne","götünekoyim","koyim","götünü","götveren","gtelek","gtn","gtnde","gtnden","gtne",
                    "gtten","gtveren","hasiktir","hassiktir","siktir","hödük","hsktr","huur","ıbnelık","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","ipne","iserim","işerim","itoğlu","kahpe","kahpenin","kaltak","kancık","kancik","kappe","karhane","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","kevaşe","kevvase","koduğmun","koduğmunun","kodumun","kodumunun","koduumun","koyarm","koyiim","koyiiym","koyum","kukudaym","laciye","liboş","madafaka","malafat","mcik","meme","memelerini","mezveleli","minaamcık","mincikliyim","monakkoluyum","motherfucker","mudik","ocuun","oğlancı","orosbucocuu",
                    "orospucocugu","cocugu","orospuçocuğu","çocuğudur","çocukları","orospudur","orospular","orospunun","evladı","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspuçocuğu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","öşex","patlak","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin","pezo","pic","pici","picler","piç","piçin","kurusu","piçler","pipi","pipiş","porno","pussy","puşttur","rahminde","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","sevişelim","sexs","sıçarım","sıçtığım","sıecem","sicarsin","sikdi","sikdiğim","sike","sikecem","siken","sikenin","siker","sikerler","sikersin","sikertir","sikertmek",
                    "sikesen","sikesicenin","sikey","sikeydim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt",
                    "sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktirgit","siktirir","siktiririm","siktiriyor","siktirolgit","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skime","skmek","sksin","sktiimin","sktrr","skyim","slaleni","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülaleni","sülalenizi","sürtük","şıllık","taaklarn","taaklarna","tarrakimin","tasak","tassak","taşak","taşşak","s.k","tipinizi","s.keyim","tiyniyat","toplarm","topsun","totoş","vajina","vajinanı","veled","veledizina","zina",
                    "verdiimin","weled","weledizina","whore","oç","xikeyim","yaaraaa","yalama","yalarım","yalarun","yaraaam","yarak","yaraksız","yaraktr","yaraminbasi","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yogurtlayam","yoğurtlayam","yrrak","zıkkımım","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini","skrm","büzük","büzüğ","siksokçu","siksokcu","sksokcu","siksoker","siksokker","siksoke","sıksoker","sıksokcu","sıksokçu","sıksok","siksocer","sksocer","oçe","yarramı","amcı","amcıyım","amguard","skym","o.ç","anskym","anaskym","anasikim","anskim","anasikm"
]
    
 const reklam3 =  ["abaza","am","amı","amın","amına","oc","gerzkılı","srfsz","şrfsz","abazan","piç","amarım","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","hoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoyim","koyyim","sikem","sokam","amın","feryadı","amını","amınoğlu","amısına","amısını","amina","aminako","aminakoyarim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","amiyum","amkafa","amlarnzn","amlı","ammak","ammna","amna","amnda","amndaki","amngtn","amnn","amona","amq","amsız","amsiz","amsz","amteri","amugaa","amuğa","amuna","anaaann","analarn","anandan","ananı","ananın",
                    "dölü","ananınki","ananısikerim","sikerim","ananısikeyim","sikeyim","ananızın","anani","ananin","ananisikerim","ananisikeyim","anasını","anasının","orospu","anasi","anasinin","anay","anayin","anneni","annenin","annesiz","anuna","atkafası","atmık","attırdığım","attrrm","auzlu","ayklarmalrmsikerim","azdır","azdırıcı","babaannesi","kaşar","pezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bacy","bastard","beyinsiz","bızır","bitch","biting","bosalmak","boşalmak","cibilliyetini","cibilliyetsiz","çük","dalaksız","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dkerim","domal","domalan",
                    "domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dönek","eben","ebeni","ebenin","ebeninki","ebleh","ecdadını","ecdadini","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","giberim","giberler","gibis","gibiş","gibmek","gibtiler","goddamn","godoş","godumun","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotveren","goyiim","goyum","goyuyim","goyyim","göt","deliği","götelek","götlalesi","götlek","götoğlanı","oğlanı","götoş","götten","götü","götün","götüne","götünekoyim","koyim","götünü","götveren","gtelek","gtn","gtnde","gtnden","gtne",
                    "gtten","gtveren","hasiktir","hassiktir","siktir","hödük","hsktr","huur","ıbnelık","ibina","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnerator","ibnesi","idiot","idiyot","ipne","iserim","işerim","itoğlu","kahpe","kahpenin","kaltak","kancık","kancik","kappe","karhane","kavat","kavatn","kaypak","kayyum","kerane","kerhane","kerhanelerde","kevase","kevaşe","kevvase","koduğmun","koduğmunun","kodumun","kodumunun","koduumun","koyarm","koyiim","koyiiym","koyum","kukudaym","laciye","liboş","madafaka","malafat","mcik","meme","memelerini","mezveleli","minaamcık","mincikliyim","monakkoluyum","motherfucker","mudik","ocuun","oğlancı","orosbucocuu",
                    "orospucocugu","cocugu","orospuçocuğu","çocuğudur","çocukları","orospudur","orospular","orospunun","evladı","orospuydu","orospuyuz","orostoban","orostopol","orrospu","oruspu","oruspuçocuğu","osbir","ossurduum","ossurmak","ossuruk","osur","osurduu","osuruk","osururum","otuzbir","öşex","patlak","penis","pezevek","pezeven","pezeveng","pezevengi","pezevengin","pezo","pic","pici","picler","piç","piçin","kurusu","piçler","pipi","pipiş","porno","pussy","puşttur","rahminde","s1kerim","s1kerm","s1krm","sakso","saksofon","saxo","sekis","sevişelim","sexs","sıçarım","sıçtığım","sıecem","sicarsin","sikdi","sikdiğim","sike","sikecem","siken","sikenin","siker","sikerler","sikersin","sikertir","sikertmek",
                    "sikesen","sikesicenin","sikey","sikeydim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikko","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinbaya","siksinler","siksiz","siksok","siksz","sikt",
                    "sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktirgit","siktirir","siktiririm","siktiriyor","siktirolgit","sittimin","sittir","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skime","skmek","sksin","sktiimin","sktrr","skyim","slaleni","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülaleni","sülalenizi","sürtük","şıllık","taaklarn","taaklarna","tarrakimin","tasak","tassak","taşak","taşşak","s.k","tipinizi","s.keyim","tiyniyat","toplarm","topsun","totoş","vajina","vajinanı","veled","veledizina","zina",
                    "verdiimin","weled","weledizina","whore","oç","xikeyim","yaaraaa","yalama","yalarım","yalarun","yaraaam","yarak","yaraksız","yaraktr","yaraminbasi","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yogurtlayam","yoğurtlayam","yrrak","zıkkımım","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiiin","ziksiin","zulliyetini","zviyetini","skm","skrm","büzük","büzüğ","siksokçu","siksokcu","sksokcu","siksoker","siksokker","siksoke","sıksoker","sıksokcu","sıksokçu","sıksok","siksocer","sksocer","oçe","yarramı","amcı","amcıyım","amguard","skym","o.ç","anskym","anaskym","anasikim","anskim","anasikm"
]


    if (reklam.some(word => message.content.toLowerCase().includes(" " + word))) {
    if (message.member.roles.cache.get("1024942008365764609")) return
    if (message.author.bot) return
message.delete();
message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${kullanici}, Sunucumuzda küfür etmek yasaktır.`).setFooter(`Atahan`).setColor('GRAY')]})
        }
 
 if (reklam.some(word => message.content.toLowerCase().includes(word + " "))) {
 if (message.member.roles.cache.get("1024942008365764609")) return
 if (message.author.bot) return
message.delete();
message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${kullanici}, Sunucumuzda küfür etmek yasaktır.`).setFooter(`Atahan`).setColor('GRAY')]})
 } 
 if (reklam2.some(word => message.content.toLowerCase().startsWith(word))) {
 if (message.member.roles.cache.get("1024942008365764609")) return
 if (message.author.bot) return
message.delete();
message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${kullanici}, Sunucumuzda küfür etmek yasaktır.`).setFooter(`Atahan`).setColor('GRAY')]})
        }
 if (reklam3.some(word => message.content.toLowerCase() === (word))) {
 if (message.member.roles.cache.get("1024942008365764609")) return
 if (message.author.bot) return
message.delete();
message.channel.send({embeds:[new Discord.MessageEmbed().setDescription(`${kullanici}, Sunucumuzda küfür etmek yasaktır.`).setFooter(`Atahan`).setColor('GRAY')]})
 } 
 }});

 client.on('messageCreate', async msg => {
    
    if (msg.author.id === client.user.id) return

    const reklam = ["sa","selam","selamun aleykum","selamün aleyküm","sea","selamun aleyküm","selamün aleykum","selam aleykum","selam aleyküm","s.a","slm"] 
    if (reklam.some(word => msg.content.toLowerCase().startsWith(word + " ") || msg.content.toLowerCase() === (word))) return msg.reply('Aleyküm Selam Hoş Geldin')
})