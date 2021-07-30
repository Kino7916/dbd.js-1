module.exports = _this => {
    
    const commands = _this.options.botCommands.filter((v, k) => k.startsWith("C-messageDelete")).array();
    /**
     * @param {import("discord.js").Message} message
     */
    function onMessageDelete(message) {
        for (const c of commands) _this._compile(c, {
            message: message || {},
            args: message?.content?.trim()?.split(/ + /g),
            bot: _this,
            client: _this.client,
            author: message?.author,
            member: message?.member,
            guild: message?.guild,
            channel: message?.channel
        })
    }
    return onMessageDelete;
}