module.exports = d => {
    if (!d.hasUsage()) return d.error(d.errmsg.noUsage);

    const [condition, errorMessage] = d.unpack(d.unpacked).splits;
    const bool = d.util.checkCondition(condition);

    if (!bool) {
        d.errorNotClient = true;
        return d.error(errorMessage || ' ');
        
    }
    
    return ""
}