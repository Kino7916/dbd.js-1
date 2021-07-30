module.exports =  d => {
    const Numbers = d.unpack(d.unpacked).splits;
    let num = Number(Numbers.shift());
    
    if (!Numbers.length) return d.error("Invalid arguments", false)

    for (const n of Numbers) {
        num = num * Number(n);

        if (isNaN(num)) break;
    }

    if (isNaN(num)) return d.error("Unexpected NaN as result", false);

    if (!isFinite(num)) return d.error("Unreadable number", false)

    return num;
}