module.exports = async d => {
    const unpacked = d.unpack(d.unpacked);
    if (!unpacked.total) return d.error("Invalid usage of function", false);

    const channelId = unpacked.inside;
    /**
     * @type {import("discord.js").GuildChannel}
     */
    const channel = await d.data.client.fetch(channelId).catch(_ => null) || null;

    if (!channel) return d.error(`Invalid channel Id of \`${channelId}\``, false);
    d.data.channel = channel;
    d.data.guild = channel.guild;
    return "";
}