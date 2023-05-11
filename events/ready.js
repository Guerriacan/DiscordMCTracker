const fs = require('node:fs');
const path = require('node:path');
const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity("Minecraft", { type: ActivityType.WATCHING })
        global.minecraftServers = JSON.parse(process.env.MINECRAFT_SERVERS);
        //search if there is an embed send by the bot in the channel and with the same title as the server
        minecraftServers.forEach((server, index) => {
            client.channels.fetch(server.channelId).then(channel => {
                channel.messages.fetch().then(messages => {
                    messages.forEach(message => {
                        if (message.embeds.length > 0 && message.embeds[0].title === server.title) {
                            //put the message id in the global variable
                            minecraftServers[index].messageId = message.id;
                        }
                    });
                });
            });
        });

        //task handler
        const tasksPath = path.join(path.dirname(__dirname), 'tasks');
        const taskFiles = fs.readdirSync(tasksPath).filter(file => file.endsWith('.js'));

        for (const file of taskFiles) {
            const filePath = path.join(tasksPath, file);
            const task = require(filePath);
            task();
        }

        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};