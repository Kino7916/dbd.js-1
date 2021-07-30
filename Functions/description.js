module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage, false);

    const text = d.unpack(d.unpacked).inside;
    const embed = d.getEmbed();
    
    if (!embed instanceof require("discord.js").MessageEmbed) return d.error("Unexpected Embed of 'null'");
    
    embed.setDescription(text);

    return "";
}