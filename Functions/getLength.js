module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage, false);

    const text = d.unpack(d.unpacked).inside;
    return text.length;
}