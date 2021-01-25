const discord = require('discord.js')
const user = new discord.Client()
const config = require('./config.json')
const token = config.token
const prefix = config.prefix
const logs = config.logs
const statustype = config.statustype
const status = config.status
const globalembedcolor = config.globalEmbedColor
const version = "0.1"
const admin = config.adminrole
const announcementchannel = config.announcementChannel
const KrunkerJS = require('krunker.js')
const Krunker = new KrunkerJS()

user.on('ready', () => {
  user.user.setActivity(status, {type: statustype})
  console.log(`R4CEBot > > Enabled Version: ${version}`)
})
user.on('message', msg=> {
    let args = msg.content.substring(prefix.length).split(" ")
    let guild = msg.guild


    switch(args[0]){
        case 'announce':
            if(msg.member.roles.cache.has(admin) || msg.member.hasPermission(`ADMINISTRATOR`)){
                var announcement = args.slice(1).join(" ");

                if(!announcement){
                    msg.channel.send("Error > > Arguments Required.")
                } else{
                    msg.channel.send('Sending announcement')
                    guild.channels.cache.get(announcementchannel).send(
                        new discord.MessageEmbed()
                        .setTitle('New announcement from ' + msg.author.tag )
                        .setDescription(announcement)
                        .setColor(globalembedcolor)
                    )
                    msg.channel.send(
                        new discord.MessageEmbed()
                        .setTitle("Posted")
                        .setThumbnail("https://gph.is/2IdiSug")
                        .setColor(globalembedcolor)
                    )
                }
            }
        break;
        
        case 'info': 
            msg.channel.send(
                new discord.MessageEmbed()
                .setTitle("Info")
                .setDescription(`**Version**: ${version}\n**Current Status**: ${status}\n**Statustype**: ${statustype}`)
                .setColor(globalembedcolor)
            )
        break;
        case 'pf': 
            var krunkeruser = args.slice(1).join(" ")

            if(!krunkeruser){
                msg.channel.send("Please specify krunker username")
            } else{
                Krunker.getUser(krunkeruser).then()
            }
    }   
})

user.login(token)