const {scheduleJob} = require("node-schedule");
const util = require('minecraft-server-util');
const {MessageEmbed} = require('discord.js');

require('dotenv').config()

module.exports = function () {
    // check every server in the env file every 10 seconds
    scheduleJob('*/10 * * * * *', function () {
        minecraftServers.forEach(server => {
            console.log(server)
            util.queryFull(server.ip, server.port, {enableSRV: true}).then((response) => {
                console.log(response)
                // check if the server has a message embed
                if (server.messageId !== null) {
                    client.channels.fetch(server.channelId).then(channel => {
                        channel.messages.fetch(server.messageId).then(message => {
                            // check if the message embed is the same as the server
                            if (message.embeds[0].title !== server.title) {
                                // edit the message embed
                                const embed = new MessageEmbed()
                                    .setColor('#0099ff')
                                    .setTitle(server.title)
                                    .addFields({name: 'Version', value: `${response.version}`, inline: true},
                                        {name: 'Players', value: `${response.players.online}`, inline: true},
                                    )
                                message.edit({embeds: [embed]});
                            }
                        });
                    });
                }
                // if the server doesn't have a message embed
                else {
                    // create a message embed
                    const embed = new MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(server.title)
                        .addFields({name: 'Version', value: `${response.version}`, inline: true},
                            {name: 'Players', value: `${response.players.online}`, inline: true},
                        )
                    // send the message embed
                    client.channels.fetch(server.channelId).then(channel => {
                        channel.send({embeds: [embed]}).then(message => {
                            // put the message id in the global variable
                            minecraftServers[minecraftServers.indexOf(server)].messageId = message.id;
                        });
                    });
                }
            });
        }).catch((error) => {
            console.log(error);
        });
    });
}