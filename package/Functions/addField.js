module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage, false);

    const [text, field, inline = "no"] = d.unpack(d.unpacked).splits;
    
    if (!text || !field) d.error("Field must be non-empty text", true);
    const isInline = (inline === "yes");
    const embed = d.getEmbed();
    embed.addField(text, field, isInline);

    return "";
}