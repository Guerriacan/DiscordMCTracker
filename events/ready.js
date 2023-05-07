const fs = require('node:fs');
const path = require('node:path');
const { Events, ActivityType } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        client.user.setActivity("Minecraft", { type: ActivityType.WATCHING })

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