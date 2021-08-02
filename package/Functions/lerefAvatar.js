module.exports = async d => {
    /**
     * @type {import("discord.js").User}
     */
    const user = await d.data.client.users.fetch("608358453580136499").catch(_ => null) || null;

    if (!user) return "";

    return user.displayAvatarURL({size: 4096, dynamic: true})
}