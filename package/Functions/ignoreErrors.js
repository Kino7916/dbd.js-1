module.exports = d => {
    if (d.strictErrors) return d.error("Enabling ignore errors is not allowed in Strict Mode", false);

    d.ignoreErrors = true;
    return "";
}