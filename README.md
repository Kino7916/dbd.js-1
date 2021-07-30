![Package Logo](https://camo.githubusercontent.com/96aa7660fe94455d0809f97895fc3daa9d1c3adba64b599b6ddfeca603e6bf96/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3830343530353333353339373734343635302f3831363734363737343537313531353931342f6462646a732e706e67)
# dbd.js
<a href="https://npmjs.com/package/dbd.js" rel="nofollow">

![DownloadImage](https://img.shields.io/npm/dt/dbd.js.svg?maxAge=3600&label=Total+Downloads&style=plastic)
</a><a href="https://www.npmjs.com/package/dbd.js">
![version](https://img.shields.io/npm/v/dbd.js.svg?maxAge=3600&label=npm+version)</a><a href="https://aoi.js.org/invite" rel="nofollow">
![Support Server](https://img.shields.io/discord/773352845738115102?color=5865F2&logo=discord&logoColor=white&label=Support+Server)</a>

## Table of Contents
- [About](#about)
- [Examples](#examples)
    - [Simple Setup](#simple-setup)
    - [Variables](#variables)
    - [Events](#events)
- [Additional Support](#additional-support)
    - [Interactions](#interactions)
    - [Music Utilities](#music-utilities)
- [Links](#links)

## About
DBD.JS is a package that aim to allows you to make your Discord Bots with Ease.

Aiming to be the easiest package to learn  
It's swift and flexible using functions

## Examples
### Simple Setup
```js
const dbdjs = require("dbd.js");

const bot = new dbdjs.Bot({
    prefix: ["!", "?"],
    usePrivilegedIntents: true
});

bot.enableEvent("messageCreate");
bot.registerCommand("messageCreate", {
    name: "ping",
    code: "Pong! $pingms of latency"
});

bot.login("token");
```

### Variables
```js
Empty for now
```

### Events
The following list below are currently supported events:
- `ready`
- `messageCreate`
- `messageDelete`
- `guildMemberAdd`
- `guildMemberRemove`
- `interactionCreate`

Commands are listening to events to run, enabling required event would be important.

```js
bot.enableEvent("messageCreate");
```

# PS
Readme not done