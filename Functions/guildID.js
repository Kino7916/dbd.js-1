module.exports = d => d.data.guild?.id || d.data.channel?.guild?.id || d.data.message?.guild?.id || d.data.member?.guild?.id ||  "";