/** 
 * @param {import("discord.js").DMChannel | import("discord.js").TextChannel | import("discord.js").NewsChannel} channel
 */
function resolveMessage(channel, options = {}) {
    if (typeof channel.send !== "function") return new TypeError();
    
    return channel.send({...options}).catch(err => console.log(err));
}

module.exports = resolveMessage