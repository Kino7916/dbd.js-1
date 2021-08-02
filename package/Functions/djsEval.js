// My fwiend djsEval, worst thign ever
const util = require("util");
module.exports = async _d => {
    if (!_d.hasUsage()) return _d.error(d.errmsg.noUsage);

    const sp = _d.unpack(_d.unpacked).splits;
    const returnValue = ["yes", "no"].includes(sp[sp.length -1]) ? (sp.shift().toLowerCase() === "yes") : false;
    let response = "";
    
    // Common variables
    const {client, bot} = _d.data;
    const channel = _d.data.channel;
    const guild = _d.data.guild;
    const message = _d.data.message;
    const member = _d.data.member;

    // Start evaluation
    try {
    const evaluated = await eval(`${sp.join(";")}`);

        response = util.inspect(evaluated, false, 2);
    } catch (error) {
        response = error;
    }

    if (returnValue) return response;
    return "";
}