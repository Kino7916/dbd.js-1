const dbdjs = require("./main/export");

const bot = new dbdjs.Bot({
    mobilePresence: true,
    useSharding: false,
    ignoreBots: true,
    ignoreDMs: false,
    prefix: ['!', "?"],
    usePrivilegedIntents: true,
    databaseOptions: {
        doCleanup: false
    }
});

bot.enableEvent("messageCreate");
bot.enableEvent("interactionCreate");
bot.registerCommand("messageCreate", {
    name:"test",
    code:`$onlyIf[$message>10;Vietnamese]$onlyIf[$message<12;]ABC`
});

bot.registerCommand("messageCreate", {
    name: "ping",
    code: "$title[uwu]"
});

bot.registerCommand("messageCreate", {
    name: "pong",
    code: `$addButton[no;aeee;abc;danger]$addButton[no;abc;Why;danger]$addButton[no;awc;Why;danger]
$newEmbed$title[ICE]$color[AQUA]$newSelectMenu[aaa;0;1;no;Hello!]
$addSelectMenuOption[aaa;ABC;u;ILIKE]
$addSelectMenuOption[aaa;ABCD;uE;AND LOVE]`
});

bot.registerCommand("interactionCreate", {
    name: "abc",
    code: "Hello!"
})

const Id = bot.createCommand({
    name: "reply",
    code: `$reply Replied to message!`
});
bot.assignType(bot.Types.Message, Id);

bot.addActivity("8Ball with Friends", "PLAYING", "ONLINE", 10);
bot.addActivity("Anime", "WATCHING", "DND", 10);

bot.login("ODI0NTAyMjgxNzMwMTI5OTMw.YFwTlg.l8RohetxHDKsmJ_ndjIe4gSopBY");
