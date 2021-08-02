const djs = require("discord.js");

module.exports = async d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage, false);

    if (!Array.isArray(d.sendOptions.components)) {
        d.sendOptions.components = [];
    }

    const rowIndex = d.sendOptions.components.length;
    /**
     * @type {djs.MessageActionRow}
     */
    let row = d.sendOptions.components[rowIndex < 1 ? 0 : rowIndex - 1];

    if (row || !row) {
        row = new djs.MessageActionRow();
        d.sendOptions.components[rowIndex] = row;
    }

    const [id, min = "0", max = "1", disabled = 'no', placeholder] = d.unpack(d.unpacked).splits;
    
    // Now annoying blocking
    if (!id) return d.error("Missing `CUSTOM_ID` for button");
    if (id && id.length > 100) return d.error("Exceeds limit characters (100) of field `CUSTOM_ID` for button");
    
    
    // now thats done
    const menu = new djs.MessageSelectMenu({
        customId: id,
        minValues: Number(min),
        maxValues: Number(max),
        disabled: disabled === "yes",
        placeholder
    });

    row.addComponents(menu);
   
    return "";
}