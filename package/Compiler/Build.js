"use strict";

const D = require("discord.js");
const util = require("../package/Handlers/Util");
async function build(d, _) {
    const InstanceData = {
        start: Date.now(),
        httpResult: null,
        ignoreErrors: false,
        errorMessage: null,
        suppressed: null,
        suppressedMessage: ["", {}],
        splits: [],
        code: "",
        data: {
            returnCode: false,
            command: d,
            $TEMPO_VAR: {},
            ..._
        },
        strictErrors: false,
        sendOptions: {},
        unpacked: "",
        embeds: [],
        wasUnpacked: false,
        unpack: function (string) {
            if (string.length) this.wasUnpacked = true;
            return {
                total: string,
                inside: string.slice(1, string.length - 1),
                splits: string.slice(1, string.length - 1).split(/[;]/g)
            }
        },
        createEmbed: function () {
            this.embeds.push(new D.MessageEmbed());
        },
        getEmbed: function() { 
            const embed = this.embeds[this.embeds.length -1];
            return embed; 
        },
        hasUsage: function () {
            if (this.unpacked) return true;
            return false;
        },
        error: function(error, onlyIfStrict) {
            error = new Error(error)
            if (this.ignoreErrors) return;
            if (onlyIfStrict && this.strictErrors) {
                this.errorMessage = error;
                return;
            }

            this.errorMessage = error;
        },
        util,
        errmsg: {
            noUsage: "Invalid usage of function"
        },
        errorNotClient: false,
        useEphemeral: false
    }
    async function walk(data) {
        let code = data.code;
        for (const v of data.functions) {
            if (InstanceData.errorMessage) break;
            /**
             * @type {String}
             */
            let F = v.shift();
            const V = v.shift();
            const File = require("../Functions/" + F.slice(1) + ".js");
            
            // Replace function to correct lowercase and uppercase
            code = code.replace(new RegExp("\\" + F, "i"), F);

            if (V) {
                InstanceData.unpacked = await walk(V);
                code = code.replace(F + "[", F + InstanceData.unpacked)
            }

            if (InstanceData.errorMessage) break;

            let output = File(InstanceData);
            if (output && typeof output.then === "function") output = await output;
            if (InstanceData.wasUnpacked) F = F + InstanceData.unpacked;
            code = code.replace(F, String(output || ( typeof output !== "string" ? F : "")));
            InstanceData.unpacked = "";
            InstanceData.wasUnpacked = false;

            if (InstanceData.errorMessage instanceof Error) {
                
                if (!InstanceData.errorNotClient)
                    InstanceData.errorMessage.message = `\`\`\`js\nCompiler ran to ${InstanceData.errorMessage.stack.replace("Script._compile", "ScriptCodeCompiler")}\`\`\``;
                
                break;
            }
        }

        return code;
    }
    return {result: await walk(d), leftover: InstanceData}
}

module.exports = build;