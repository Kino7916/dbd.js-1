const djs = require("discord.js");
const fs = require("fs");

class ShardingProgram {
    /**
     * @param {{
     * ignoreDMs: true | boolean;
     * ignoreBots: true | boolean;
     * ignoreMe: true | boolean;
     * prefix: Array<string> | string;
     * mobilePresence: false | boolean;
     * usePrivilegedIntents: true | boolean;
     * }} clientOptions
     */
    constructor(clientOptions) {
        this.fileName = 'shard_client_instance.js';
        // no big writy here
        this.fileContent = this.getFileContent();
        /**
         * @type {djs.ShardingManager}
         */
        this.manager = null;
        this.clientStatuses = [];
        this.devicePresence = 'discord.js';
        this.intents = 'NON_PRIVILEGED';
        
        if (clientOptions.mobilePresence) this.devicePresence = 'Discord iOS';
        if (clientOptions.usePrivilegedIntents) this.intents = 'ALL';
        
    }

    getFileContent() {
        return fs.readFileSync(require("path").resolve("./clientInstance_Template.js")).toString();
    }

    login(Token) {
        // replacing values
        // for mgr to comply with options
        // and successful process
        // and i cant english
        this.fileContent.replace("TOKEN", Token);
        this.fileContent.replace("_MP_TRUE?", this.devicePresence);
        this.fileContent.replace("_INTENT_PROP", this.intents);
        
        fs.writeFileSync(require("path").resolve(`./${this.fileName}`), this.fileContent);

        // create sharding manager instance
        this.manager = new djs.ShardingManager(require("path").resolve(`./${this.fileName}`), {
            token: Token, // just in case
            totalShards: 'auto'
        });

        this._processRequests()
    }
}