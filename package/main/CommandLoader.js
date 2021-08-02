const fs = require("fs");
const path = require("path");

class CommandLoader extends EventEmitter
{
    /**
     * 
     * @param {{
     * stylishOutput: false | boolean;
     * logToConsole: false | boolean;
     * path: string;
     * }} LoaderOptions
     */
    constructor(LoaderOptions) {
        super()
        this.ignored = [];
        this.errored = [];
        this.success = [];
        this.path = path.isAbsolute(LoaderOptions.path) ? path.resolve(LoaderOptions.path) : LoaderOptions.path;
        this.stylishOutput = false;
        this.logToConsole = false;
        this.timeStart = 0;
    }

    loadSync(path) {
        this.timeStart = Date.now();
        const addSuccess = (d) => this.success.push(d);
        
        function walk() {
            const path = inQueue.shift();
            
            if (path) {
                
            }
        }
    }

}
