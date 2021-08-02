module.exports = d => {
    const unpack = d.unpack(d.unpacked);

    if (!unpack.total) return d.error("Invalid usage of function", false);
    
    const [
        text, 
        separator] = unpack.splits;

    d.splits = text.split(separator);
    return "";
}