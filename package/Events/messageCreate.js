/**
     * 
     * @param {import("discord.js").Message} message 
     */
function getMessageModule(message, program) {
    return {
        message,
        bot: program, // shouldn't be used when sharding, maybe it will be removed someday
        client: message.client,
        author: message.author,
        member: message?.member,
        guild: message?.guild,
        channel: message.channel
    }
}
module.exports = () => {
        /**
     * 
     * @param {import("discord.js").Message} message 
     */
    function onMessage(message) {
        const program = message.client.dbdjsProgram
        if (program.options.ignoreDMs && message.channel.type === "dm") return;
        if (program.options.ignoreBots) {
            if (program.options.ignoreMe && message.author.id === program.client.user.id) return;
            if (message.author.bot === true && message.author.id !== program.client.user.id) return;
        }
       
        const commands = Array.from(program.options.botCommands.filter((v, k) => k.startsWith("C-message")));

        const withoutName = commands.filter(v => !v.name);
        const withName = commands.filter(v => v.name);
        const prefix = program.options.botPrefix;

        for (const c of withoutName) program._compile(c, {...getMessageModule(message), args: message?.content.trim().split(/ +/g).slice(1)});
        for (const c of withName) {
            const _check = prefix.slice(0).map(
                v => v + c.name.toLowerCase()
            ).find(v => message.content.toLowerCase().startsWith(v))
            if (!_check) continue;
            program._compile(c, {...getMessageModule(message, program), args: message?.content.slice(_check.length).trim().split(/ +/g)})
        }
    }
    return onMessage;
}