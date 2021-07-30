module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage, false);

    const [text, icon] = d.unpack(d.unpacked).splits;
    const embed = d.getEmbed();
    
    if (!embed instanceof require("discord.js").MessageEmbed) return d.error("Unexpected Embed of 'null'");
    
    embed.setFooter(text, icon);

    return "";

}