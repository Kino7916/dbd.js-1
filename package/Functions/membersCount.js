module.exports = d => {
    const guild = d.data.guild;

    if (!guild) d.error("Unsupported event for function", true);

    return ( guild?.memberCount || "").toString()
}