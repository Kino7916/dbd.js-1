module.exports = d => {
    return Date.now() - d.data.client.readyTimestamp;
}