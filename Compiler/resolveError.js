const discord = require("discord.js");

/**
 * 
 * @param {Error} error 
 */
async function resolve(error, This, msg = {}) {
    const message = error.message;
    
    
   
 return {content: message, embed: {}, files:  []}
}

module.exports = resolve