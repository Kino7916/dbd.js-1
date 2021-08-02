const {Util} = require("discord.js");

// Source: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

function getColor(raw_color) {
    const nC = Number(raw_color);

    if (!isNaN(nC)) return nC;

    const sC = Util.resolveColor(raw_color);
    if (!isNaN(sC)) return sC;
    const r_rgb = hexToRgb(raw_color);
    const rgb = (r_rgb?.r + r_rgb?.g + r_rgb?.b) || null;
    
    if (!isNaN(rgb)) return rgb;
    return 0;
}
  
module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage, false);
    
    /**
     * @type {String}
     */
    const raw_color = d.unpack(d.unpacked).inside;
    const color = getColor(raw_color);
    const embed = d.getEmbed();
    
    if (!embed instanceof require("discord.js").MessageEmbed) return d.error("Unexpected Embed of 'null'");
    
    embed.setColor(color);
    return "";
}