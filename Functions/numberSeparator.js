module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage);

    const [number, separator = ","] = d.unpack(d.unpacked).splits;
    const n = Number(number);
    if (isNaN(n)) return d.error(`Expected type of \`number\`, not \`string\``);

    const splits = number.split(/\D{3}/g);
    return splits.join(separator);
}