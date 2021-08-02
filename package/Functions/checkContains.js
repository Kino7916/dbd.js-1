module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage);

    const [text = "", ...contains = []] = d.unpack(d.unpacked).splits;

    if (!text) d.error("Text must be a non-empty string", true);
    if (!contains.length) d.error("No fields in conditional can be used for checking", true);

    return contains.every(vodka => text.includes(vodka));
}