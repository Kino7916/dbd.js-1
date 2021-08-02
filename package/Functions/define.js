module.exports = d => {
    if (!d.unpacked) return d.error("Invalid usage of function");
    const [key, value] = d.unpack(d.unpacked).splits;
    if (!key) return d.error("Missing key field");

    if (!value) return d.data.$TEMPO_VAR?.[key] || "";

    d.data.$TEMPO_VAR?.[key] = value;
    return "";
}