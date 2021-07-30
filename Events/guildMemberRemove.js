module.exports = _this => {
    
    const commands = _this.options.botCommands.filter((v, k) => k.startsWith("C-guildMemberRemove")).array();
    /**
     * @param {import("discord.js").GuildMember} member
     */
    function onGuildMemberRemove(member) {
        for (const c of commands) _this._compile(c, {
            message: {},
            args: [],
            bot: _this,
            client: _this.client,
            author: member.user,
            member,
            guild: member.guild,
            channel: {}
        })
    }
    return onGuildMemberRemove;
}