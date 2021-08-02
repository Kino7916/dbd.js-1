module.exports = () => {
    
    /**
     * @param {import("discord.js").Message} message
     */
    function onMessageDelete(message) {
        const program = message.client.dbdjsProgram;
        const commands = Array.from(program.options.botCommands.filter((v, k) => k.startsWith("C-messageDelete")));

        for (const c of commands) program._compile(c, {
            message: message || {},
            args: message?.content?.trim()?.split(/ + /g),
            bot: program,
            client: program.client,
            author: message?.author,
            member: message?.member,
            guild: message?.guild,
            channel: message?.channel
        })
    }
    return onMessageDelete;
}