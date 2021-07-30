module.exports = async d => {
    const id = d.unpack(d.unpacked).inside;

    /**
     * @type {import("discord.js").User}
     */
    const user = await d.data.client.users.fetch(id).catch(_ => null) || null;

    if (id && !user) d.error("Invalid user Id of `" + id + "`", true);

    return user.username || d.data?.author?.username || ""
}