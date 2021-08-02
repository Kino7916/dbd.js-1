const djs = require("discord.js");

module.exports = async d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage, false);

    if (!Array.isArray(d.sendOptions.components)) {
        d.sendOptions.components = [];
    }
    const [menuId, label, value, description, isDefault = 'no', emoji] = d.unpack(d.unpacked).splits;
    
    /**
     * @type {djs.MessageSelectMenu}
     */
    const menu = d.sendOptions.components.find(/** @param {djs.MessageActionRow} v */v => v.components[0] instanceof djs.MessageSelectMenu && v.components[0]?.customId === menuId).components[0];

    if (!menu) return d.error("Expected type of 'Select_Menu'");

    // now thats done

    menu.addOptions([{
        label,
        value,
        default: isDefault === "yes",
        emoji,
        description
    }]);
   
    return "";
}