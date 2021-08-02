module.exports = d => {
    return (( Date.now() - d.start ) / 1000).toFixed(3);
}