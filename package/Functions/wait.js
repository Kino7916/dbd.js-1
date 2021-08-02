module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage);

    const duration = d.unpack(d.unpacked).inside;
    const dur = isNaN(Number(duration)) ? Number(duration) * 1000 : d.util.msParser(duration);

    if (isNaN(dur)) return d.error("Unexpected duration of `NaN`")
    return new Promise(resolve => setTimeout(function () {
        resolve("");
    }, dur));
}