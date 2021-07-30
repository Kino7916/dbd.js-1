module.exports = _this => {

    const commands = _this.options.botCommands.array().filter((_, k) => k.startsWith("C-ready")).array();
    function onReady() {
        for (const c of commands) _this._compile(c, {bot: _this, client: _this.client})
    }
    return onReady;
}