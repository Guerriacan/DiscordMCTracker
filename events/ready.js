const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity("Minecraft", { type: ActivityType.WATCHING })
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};