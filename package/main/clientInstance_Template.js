// Shard Instance
// Definitely safe

// use strict for gud purposes
"use strict";
const Discord = require("discord.js");
const Intents = Discord.Intents["_INTENT_PROP"];
const devicePresence = '_MP_TRUE?';

const client = new Discord.Client({
    ws: {
        properties: {
            $browser: devicePresence
        }
    },
    intents: Intents
});

client.ignore = {
    dm: "_DM",
    bot: "_BOT",
    me: "_ME"
};

client.statusList = '_PRES_LIST'

client.login("TOKEN")