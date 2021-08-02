module.exports = () => {
    
    /**
     * @param {import("discord.js").GuildMember} member
     */
    function onGuildMemberRemove(member) {
        const commands = Array.from(member.client.dbdjsProgram.options.botCommands.filter((v, k) => k.startsWith("C-guildMemberRemove")));
        const program = member.client.dbdjsProgram;
        for (const c of commands) program._compile(c, {
            message: {},
            args: [],
            bot: program,
            client: member.client,
            author: member.user,
            member,
            guild: member.guild,
            channel: {}
        })
    }
    return onGuildMemberRemove;
}