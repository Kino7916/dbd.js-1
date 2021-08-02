module.exports = d => {

    const ms = d.unpack(d.unpacked).splits;
    const embed = d.getEmbed();
    
    if (!embed instanceof require("discord.js").MessageEmbed) return d.error("❌ No Embeds are found to be used, are you sure you had run $newEmbed?,");
    
    embed.setTimestamp(Number(ms) || Date.now());

    return "";

}