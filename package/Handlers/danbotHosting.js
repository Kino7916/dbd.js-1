const dbh = require("danbot-hosting");
const djs = require("discord.js");

function connect(key, client) {
    if (client instanceof djs.ShardingManager) {
        const dbhShardClient = new dbh.ShardingClient(key, client);
        
    } else {
        const dbhClient = new dbh.Client(key, client);
        dbhClient.autopost().then(function (err) {
            if (err) return console.error(`\x1b[31mDANBOT HOSTING API\x1b[0m: Error encountered! \x1b[30m\x1b[4m\x1b[32m${err}\x1b[0m.`);
            return console.info(`\x1b[32mDANBOT HOSTING API\x1b[0m: Successfull connection was made to REST.`);
        })
    }
}

module.exports = connect;