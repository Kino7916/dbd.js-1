module.exports = d => {
    d.sendOptions.allowedMentions = {
        users: [],
        roles: [],
        repliedUser: false
    }

    return ""
}