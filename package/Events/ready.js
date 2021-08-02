module.exports = () => {

    function onReady(client) {
        const program = client.dbdjsProgram
        const commands = Array.from(program.options.botCommands.filter((_, k) => k.startsWith("C-ready")));
        for (const c of commands) program._compile(c, {bot: program, client: client})
    }
    return onReady;
}