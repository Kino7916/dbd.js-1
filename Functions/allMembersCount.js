module.exports = d => {
    const guilds = d.data.client.guilds.cache.array();

    if (!guilds.length) return 0;

    return guilds.reduce((perv, guild) => {
        perv += guild.memberCount;
        return perv;
    }, 0);
}