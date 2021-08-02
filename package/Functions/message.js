function getConditional(string = "") {
    const arg = [null, null];
    if (string.startsWith(">")) arg[0] = parseInt(string.slice(1)) + 1 || null;
    if (string.startsWith("<")) arg[1] = parseInt(string.slice(1)) - 1 || null;
    if (string.endsWith(">")) arg[0] = parseInt(string.slice(0, string.length - 1)) + 1|| null;
    if (string.endsWith("<")) arg[1] = parseInt(string.slice(0, string.length - 1)) - 1|| null;

    const sp = string.split("-");
    if (sp.length > 1) {
        arg[0] = parseInt(sp[0]) - 1 || null;
        arg[1] = parseInt(sp[1]) || null;
    }

    return {
        start: arg[0],
        end: arg[1] || null
    }
}

module.exports = d => {
    /**
     * @type {String}
     */
    const content = d.data?.message?.content;

    if (!d.data.message) return d.error("Unsupported event for function", false);

    if (!content || typeof content !== "string") return ""

    const args = content.trim().split(/ +/g);
    // This is the command
    // replace empty
    args[0] = ""; // args[0] = "LerefCuteUwu";
    const get = d.unpack(d.unpacked).total;
    if (!get) {
        return args.slice(1).join(" ")
    }

    if (!isNaN(Number(get.slice(1, get.length - 1)))) {
        return args[Number(get.slice(1, get.length - 1))] || ""
    }

    if (!["<", ">", "-"].find(v => get.includes(v))) {
        if (d.strictErrors) d.error("No match for operator `<->`", true);

        return ""
    }

    //if not a number
    const cd = getConditional(get.slice(1, get.length - 1));

    return args.slice(1).slice(cd.start, cd.end || args.length).join(" ");
}