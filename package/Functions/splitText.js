module.exports = d => {
    const unpack = d.unpack(d.unpacked);

    if (!unpack.total) return d.error("Invalid usage of function", false);
    const get = Number(unpack.inside);

    if (isNaN(Number(get))) return d.error("Incorrect type of `" + unpack.inside + "`, wanted `number`");
    if (!d.splits[get -1]) d.error("Unkown argument of SPLIT_" + get.toString());

    return d.splits[get -1];
}