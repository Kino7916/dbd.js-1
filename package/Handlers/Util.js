class Util {

    constructor() {
        
    }

    checkCondition(str) {
      const operators = () => {
        for (const op of ["<=", ">=", "==", "!=", "<", ">"]) {
          if (str.includes(op)) return op;
        }
      };
    
      // Getting Operator
      const op = operators();
    
      // Define Conditions
      const c = str.split(op),
      c1 = c[0],
      c2 = c[1],
      c1N = new Number(c1),
      c2N = new Number(c2);
    
      // Handle Conditions with Operator
        // Condition must be the exact same
        if (op === "==" && c1 === c2) return true
        // Condition must not be same
        else if (op === "!=" && c1 !== c2) return true 
        // Condition is bigger than target
        else if (op === ">") {
          // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N > c2N) return true
            // else count length of condition string 
            else if (c1.length > c2.length) return true
            // if those are incorrect / below, return false
            else return false
        }
        // Condition is smaller than target 
        else if (op === "<") {
          // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N < c2N) return true
            // else count length of condition string 
            else if (c1.length < c2.length) return true
            // if those are incorrect / below, return false
            else return false
        }
        // Condition is bigger or same as target
        else if (op === ">=") {
           // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N >= c2N) return true
            // else count length of condition string 
            else if (c1.length >= c2.length) return true
            // if those are incorrect / below, return false
            else return false
        }
    
        // Condition is smaller or same as target
        else if (op === "<=") {
           // Handle this operator in a new scope
            // if conditions are number
            if (!isNaN(c1N) && !isNaN(c2N) && c1N <= c2N) return true
            // else count length of condition string 
            else if (c1.length <= c2.length) return true
            // if those are incorrect / below, return false
            else return false
        }
        // If no operator were present but the whole condition are boolean
        else if (!op && str.toLowerCase() === "true") return true; 
        // If all of them are incorrect
        return false;
    
    }
    
    msParser(string) {
        if (typeof string !== "string") return 0;
        let ms = 0;
        const ar = string.split(/(\D)/g)
        let op = ["s", "m", "h", "d", "M", "y"]
        let intVal = 0;
        let err = null;
        for (const v of ar) {
          if (!isNaN(new Number(v))) {
            intVal = parseInt(v);
          } else if (op.includes(v)) {
            if (!intVal) {
              err = new Error("Unexpected Identifier to be present before number!");
              break;
            }
            if (v === "s") ms += intVal;
            if (v === "m") ms += intVal * 60;
            if (v === "h") ms += intVal * 60 * 60;
            if (v === "d") ms += intVal * 60 * 60 * 24;
            if (v === "M") ms += intVal * 60 * 60 * 24 * 30;
            if (v === "y") ms += intVal * 60 * 60 * 24 * 30 * 12;
            intVal = 0;
          } else {
            err = new Error("Invalid Identifier of '" + v + "' present in string!");
            break;
          }
        }
        if (err) return err;
        return ms * 1000;
     }
}

module.exports = new Util();