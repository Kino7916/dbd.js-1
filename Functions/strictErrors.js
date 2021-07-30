module.exports = d => {
    if (d.ignoreErrors) return "";
    if (d.strictErrors) return d.error("Can't enable strict errors when it's already enabled", false);

    d.strictErrors = true;
    return "";
}