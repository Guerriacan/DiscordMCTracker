const {scheduleJob} = require("node-schedule");
const util = require('minecraft-server-util');

module.exports = function() {
    scheduleJob('*/10 * * * * *', function() {
        util.queryFull(process.env.MC_SERVER_IP, Number(process.env.MINECRAFT_SERVER_PORT), {enableSRV: true}).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    });
}