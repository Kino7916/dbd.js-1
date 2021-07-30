module.exports = async d => {
    if (!d.unpacked) {
        const guild = d.data.guild || d.data.channel?.guild || d.data.message?.guild || d.data.member?.guild || null;
        if (!guild) d.error("Unsupported event for function", true);

        return guild?.ownerID || "";
    }

    const guildId = d.unpack(d.unpacked).inside;
    /**
     * @type {import("discord.js").Guild | null}
     */
    const guild = await d.data.client.guilds.fetch(guildId).catch(_ => null) || null;

    if (!guild) return d.error(`Invalid guild Id of \`${guildId}\``, false);
    return guild.ownerID || "";
}