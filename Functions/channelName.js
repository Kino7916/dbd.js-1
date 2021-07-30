module.exports = async d => {
    const id = d.unpack(d.unpacked).inside;
    const channel = await d.data.client.channels.fetch(id).catch(_ => null) || null;

    if (id && !channel) d.error("Invalid channel Id of `" + id + "`", true);

    return channel.name || d.data?.channel?.name || "";
}