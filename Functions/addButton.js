const djs = require("discord.js");
const Styles = ["primary", "secondary", "success", "danger", "link"];

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

    if (!row) {
        row = new djs.MessageActionRow();
        d.sendOptions.components[rowIndex] = row;
    }

    const [newRow = 'no', label = '', id, style = '', disabled = 'no', emoji, url] = d.unpack(d.unpacked).splits;
    
    // Now annoying blocking
    if (!id) return d.error("Missing `CUSTOM_ID` for button");
    if (id && id.length > 100) return d.error("Exceeds limit characters (100) of field `CUSTOM_ID` for button");
    
    const color = Styles.findIndex(v => v === style?.toLowerCase?.());
    if (color < 0) return d.error(`Invalid style of \`${style}\``);

    if (color === 5 && !url) return d.error("URL is required for `LINK` style");
    if (newRow === "yes" || row.components.length > 4) {
        if (d.sendOptions.components.length > 4) return d.error(`ACTION_ROW limit reached (5)`);
        d.sendOptions.components[rowIndex] = new djs.MessageActionRow();
        row = d.sendOptions.components[rowIndex];
    }
    // now thats done
    const button = new djs.MessageButton({
        label,
        style: Styles[color].toUpperCase(),
        disabled: ( disabled === "yes" ),
        emoji,
        url,
        customId: id
    });

    row.addComponents(button);
   
    return "";
}