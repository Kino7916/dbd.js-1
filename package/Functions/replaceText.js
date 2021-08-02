module.exports = d => {
    if (!d.hasUsage()) return d.error(d.ermsg.noUsage);

    const [parent = "", sample = "", replace = "", howMany = "-1"] = d.unpack(d.unpacked).splits;

    if (howMany === "-1") {
        const _add = parent.includes(replace);
        const sp = parent.split(sample);

        return sp.join(replace);
    } else if (( Number(howMany) || 0) > 0) {
        const sp = parent.split(sample);
        const n = Number(howMany);

        if (sp.length <= n) return sp.join(replace);
        const _1 = sp.splice(0, n);

        return _1.join(replace) + replace + sp.join(sample);
    } else return parent;

}