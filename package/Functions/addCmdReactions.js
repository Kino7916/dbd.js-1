module.exports = d => {
    /**
     * @type {import("discord.js").Message}
     */
    const message = d.data.message;

    if (!message) {
        d.error("Unsupported function for event", true);
        return "";
    }

    const unpack = d.unpack(d.unpacked);
    if (!unpack.total) return d.error("Invalid usage for function");

    for (const emojiId of unpack.splits) message.react(emojiId).catch(_ => null);

    return "";
}