module.exports = async d => {
    if (!d.unpacked.length) {
        const message = d.data.message;

        if (!message) return d.error("Invalid usage for function", false);
        d.sendOptions.reply = {
            messageReference: message,
            failIfNotExists: false
        };
        return "";
    }

    const [messageId, channelId] = d.unpack(d.unpacked).splits;
    /**
     * @type {import("discord.js").Client}
     */
    const client = d.data.client;
    /**
     * @type {import("discord.js").TextChannel}
     */
    const channel = await client.channels.fetch(channelId || d.data.channel?.id).catch(_ => null) || null;

    if (!channel) return d.error("Invalid channel Id of `" + channelId + "`", false);
    if (typeof channel.send !== "function") return d.error(`Unwanted channel type of \`${channel.type}\``, false);

    const message = await channel.messages.fetch(messageId, {force: false, cache: true}).catch(_ => null) || null;

    if (!message) d.error(`Invalid message Id of \`${messageId}\` in channel Id \`${channel.id}\``, true);
    d.sendOptions.reply = {
        messageReference: message,
        failIfNotExists: false
    }
    return "";
}