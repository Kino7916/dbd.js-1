"use strict";
const FunctionList = Object.keys(require("./FunctionList"));

/**
 * Finds the closest function in string
 * @param {String} name 
 * @returns {String|null}
 */
 function closestMatch(name) {
    return FunctionList
        .filter(f => name.slice(0, f.length).toLowerCase() === f.toLowerCase())
        .sort((vodka, chacha) => chacha.length - vodka.length)
        [0] || null;
}
/**
 * Predicates of incoming function
 * @param {String} name 
 * @returns {String|null}
 */
 function predicateFunction(name) {        
    return FunctionList
        .filter(f => f.toLowerCase()
        .includes(name.toLowerCase()))
        .sort((vodka, chacha) => vodka.length - chacha.length)
        [0]
        || null;
}
/**
 * Gets a function in matched string
 * @param {String} name 
 * @returns {String|null}
 */
function getFunction(name) {
    return FunctionList
            .filter(f => f.toLowerCase()
            .includes(name.toLowerCase()))
            .find((vodka) => vodka.length === name.length) 
            || null;
}
/**
 * 
 * @param {String} code 
 */
function Interpreter(code) {
    const copyCode = code.slice(0);
    let current = 0;
    let char = copyCode[current];
    let collectedFunctions = [];
    let newCode = "";
    function getUnpack(dontCompile = false) {
        if (char !== "[") return null
        let stop = false;
        let end = 0;
        let data = "[";
        unpacking:
        while (current < copyCode.length && !stop) {
            char = copyCode[current];
            current++;
            if (char === "[") {
                end += 1;
            }
            if (char === "]") end -= 1;
            data += char;
            if (end < 0) {
                stop = true;
                break unpacking;
            }
        }
        
        return dontCompile ? data : Interpreter(data);
    }

    parsing:
    while (current < copyCode.length) {
        char = copyCode[current];
        
        if (char === "$") {
            let initialValue = '$';
            current++;
            char = copyCode[current];
            getFunc:
            while (current < copyCode.length) {
                if (/[\[\]$ ]/.test(char)) break getFunc;

                initialValue += char;
                current++;
                if (copyCode[current]) char = copyCode[current]
                else char = ""
                
                if (!predicateFunction(initialValue)) {
                    break getFunc;
                } 
            }
     
            if (char !== "$") initialValue += char;
            if (char !== "$") current++;
            
            const F = getFunction(closestMatch(initialValue) || "");
            if (F) collectedFunctions.push([F, getUnpack()]);
            
            newCode += initialValue
            
            continue parsing;
        } else {
            newCode += char;
            current++;
            continue parsing;
        }
        }
    return {code: newCode, functions: collectedFunctions}
}

module.exports = Interpreter