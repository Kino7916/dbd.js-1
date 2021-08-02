const discordjs = require("discord.js");
const shardmgr = new discordjs.ShardingManager("./testbot.js", {token: "ODQ4MDc4NTA1ODk1OTE5NjQ2.YLHYqA.HbDfTyAoXUcC5_Q5bPq-4PWkvtA"});

shardmgr.on("shardCreate", (shard) => console.log(`Shard spawned: ${shard.id}`));
shardmgr.spawn()