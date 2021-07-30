module.exports = d => {
    if (!d.unpacked) {
        const guild = d.data.guild
        || d.data.channel?.guild
        || d.data.message?.guild
        || d.data.member?.guild
        || null;

        if (!guild) return d.error("Invalid usage for function", false);
        return guild.name || "";
    }

    const guildId = d.unpack(d.unpacked).inside;
    /**
     * @type {import("discord.js").Client}
     */
    const client = d.data.client;
    const guild = await client.guilds.fetch(guildId).catch(_ => null) || null;

    if (!guild) return d.error(`Unkown or Restricted guild ID of \`${guildId}\``, false);
    return guild.name;
}