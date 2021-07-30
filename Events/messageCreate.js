/**
     * 
     * @param {import("discord.js").Message} message 
     */
function getMessageModule(message, _this) {
    return {
        message,
        bot: _this, // shouldn't be used when sharding, maybe it will be removed someday
        client: _this.client,
        author: message.author,
        member: message?.member,
        guild: message?.guild,
        channel: message.channel
    }
}
module.exports = _this => {
        /**
     * 
     * @param {import("discord.js").Message} message 
     */
    function onMessage(message) {
        if (_this.options.ignoreDMs && message.channel.type === "dm") return;
        if (_this.options.ignoreBots) {
            if (_this.options.ignoreMe && message.author.id === _this.client.user.id) return;
            if (message.author.bot === true && message.author.id !== _this.client.user.id) return;
        }
       
        const commands = _this.options.botCommands.filter((v, k) => k.startsWith("C-message")).array();

        const withoutName = commands.filter(v => !v.name);
        const withName = commands.filter(v => v.name);
        const prefix = _this.options.botPrefix;

        for (const c of withoutName) _this._compile(c, {...getMessageModule(message), args: message?.content.trim().split(/ +/g).slice(1)});
        for (const c of withName) {
            const _check = prefix.slice(0).map(
                v => v + c.name.toLowerCase()
            ).find(v => message.content.toLowerCase().startsWith(v))
            if (!_check) continue;
            _this._compile(c, {...getMessageModule(message, _this), args: message?.content.slice(_check.length).trim().split(/ +/g)})
        }
    }
    return onMessage;
}