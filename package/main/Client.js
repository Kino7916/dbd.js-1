const Discord = require("discord.js");
const connectDBH = require("../Handlers/danbotHosting");
const statusHandler = require("../Handlers/statusHandler");
const ActivityTypes = ["PLAYING", "STREAMING", "WATCHING", "LISTENING", "CUSTOM", "COMPETING", "LISTENING"];
const Statuses = ["ONLINE", "INVISIBLE", "IDLE", "DND"];
const resolveError = require("../Compiler/resolveError");
const resolveMessage = require("../Compiler/resolveMessage");
const Database = require("./Database");

// Alpha version
// just in case if they're lazy
const Alpha_Events = require("./ALPHA_Types");
const Events = Object.values(Alpha_Events);

function runEvent(event) {
    return require("../Events/" + event + ".js")();
}


class Script {
    /**
     * 
     * @param {{
     * useInternalSharding: false | boolean;
     * prefix: Array<string> | string;
     * mobilePresence: false | boolean;
     * useSharding: false | boolean;
     * danbotHostingKey: string;
     * ignoreDMs: true | boolean;
     * ignoreBots: true | boolean;
     * ignoreMe: true | boolean;
     * usePrivilegedIntents: true | boolean;
     * shardCount: 1 | number;
     * useDatabase: false | boolean;
     * databaseOptions: import("../Handlers/Types").MySQLDatabaseOptions;
     * }} clientOptions 
     */
    constructor(clientOptions) {
        const _s = Date.now();

        this.Types = Alpha_Events;
        /**
         * @type {Database|null}
         */
        this.db = null;
        this.options = {
            shardCount: 1,
            ws: {
                properties: {
                    $browser: "discord.js"
                },
            },
            botPrefix: [],
            botCommands: new Discord.Collection(),
            index: 0,
            ignoreDMs: clientOptions.ignoreDMs,
            ignoreBots: clientOptions.ignoreBots,
            ignoreMe: clientOptions.ignoreMe,
            intents: Discord.Intents.NON_PRIVILEGED,
            status: new Discord.Collection(),
            _ALPHA_IDS: new Discord.Collection()
        }

        if (clientOptions.usePrivilegedIntents === true) this.options.intents = Object.keys(Discord.Intents.FLAGS);

        console.log("Initializing Bot Settings...");

        // Internal Sharding
        if (clientOptions.useInternalSharding === true) this.options.shards = "auto"; 
        if (Array.isArray(clientOptions.prefix)) this.options.botPrefix = clientOptions.prefix;
        if (typeof clientOptions.prefix === "string") this.options.botPrefix.push(clientOptions.prefix);
        if (!this.options.botPrefix.length) throw new Error("Mismatch of prefix Type / No prefix was present or set");
        if (clientOptions.mobilePresence === true) this.options.ws.properties.$browser = "Discord iOS";
        
        if (clientOptions.useDatabase) {
            this.db = new Database(clientOptions.databaseOptions);
        }
        
        this.client = new (class _CL_EXTENDED extends Discord.Client {})(this.options);
        this.client.dbdjsProgram = this;
        this.client.once("ready", function (client) {
            
            console.log(`Connected to Discord bot, Details:
    Username: ${client.user.username}
    ID: ${client.user.id}
`)
            console.log("Running STATUS_HANDLER...");
            statusHandler(client.dbdjsProgram.options.status, client.dbdjsProgram);
            console.log("Discord.js client Initialized and is ready!");
            if (clientOptions.danbotHostingKey) {
                console.log("Initializing Danbot Hosting API...")
                connectDBH(clientOptions.danbotHostingKey, client);
            }
            
            console.log(`Process finished, takes ${Date.now() - _s}ms`);

        })

    }
    /**
     * Enable Discord.js event
     * @param {"messageCreate" | "messageDelete" | "guildMemberAdd" | "guildMemberRemove" | "ready" | "messageCreate" | "interactionCreate"} event
     */
    enableEvent(event) {
        if (!Events.includes(event)) throw new TypeError(`Unsupported event of "${event}"!`);
        this.client.on(event, runEvent(event));
    }

    /**
     * Register commands to an event
     * @param {"messageCreate" | "messageDelete" | "guildMemberAdd" | "guildMemberRemove" | "ready" | "messageCreate" | "interactionCreate"} event
     * @param {{
     * name: string,
     * aliases: Array<string> | string,
     * code: string
     * }} command
     */
    registerCommand(event, command) {
        if (!Events.includes(event)) throw new TypeError(`Unsupported event of "${event}"!`);
        if (!this.client.eventNames().includes(event)) throw new Error(`Event named "${event}" is not enabled, please enabled first!`);
        if (!"code" in command || !command.code) throw new Error("Command code is required!");
        if ("aliases" in command && !Array.isArray(command.aliases) && !command?.aliases?.every(v => typeof v === "string")) throw new TypeError("Command Aliases must be an Array of strings!");

        this.options.botCommands.set("C-" + event + "-" + this.options.index.toString(), command);
        this.options.index += 1;
    }

    /**
     * Starts the package and initialize discord bot with provided token
     * @param {String} Token - Discord Bot Token
     */
    login(Token) {
        console.log("Received command of Login, trying...")
       return this.client.login(Token)
    }
    /**
     * Adds an activity to bot status
     * @param {String} Activity - The activity the bot is doing
     * @param {Discord.ActivityType} ActivityType
     * @param {Number} [Lifetime=10] - The amount of time you want the status to display
     * @param {String} StreamURL - The url of a Twitch stream or etc, (only works with STREAM type)
     * @param {"ONLINE" | "IDLE" | "INVISIBLE" | "DND"} [ClientStatus="ONLINE"] - The client status in Discord
     * @param {boolean} isCode - Indicates wether the Activity need to be compiled like command codes
     */
    addActivity(Activity, ActivityType, ClientStatus, Lifetime, StreamURL, isCode = false) {
        if (typeof Activity !== "string" || !Activity) throw new Error("A kind of activity is required!");
        if (!ActivityTypes.includes(ActivityType)) throw new TypeError(`Activity type of "${ActivityType}" does not exist!`);
        if (ActivityType === "CUSTOM") throw new TypeError("Activity Type of \"CUSTOM\" is not supported for bots!");
        if (isNaN(Lifetime)) throw new TypeError("Lifetime duration must be a Number!");
        if (Lifetime < 10) throw new Error("Lifetime duration is not allowed ( BELOW 10 )!");
        if (!Statuses.includes(ClientStatus.toUpperCase())) throw new TypeError(`Invalid or Unknown type of Status of "${ClientStatus}"!`);
        if (StreamURL && ActivityType !== "STREAMING") console.warn(`Stream URL was added, but Activity type is not "STREAMING", URL will be ignored.`);
        isCode = (isCode === "yes" || isCode === true);
        
        if (isCode) Activity = this._compile({name: "ST-" + this.options.index.toString(), code: Activity}, {bot: this, client: this.client});
        this.options.status.set("ST-" + this.options.index.toString(), {
            name: Activity,
            type: ActivityType,
            Lifetime: Lifetime,
            url: StreamURL,
            status: ClientStatus.toLowerCase()
        });
        
        this.options.index += 1;
    }

    /**
     * @private
     * @static
     * @param {{
     * name: string,
     * aliases: Array<string> | string,
     * code: string
     * }} command 
     * @param {Object} data 
     * @returns 
     */
    async _compile(command, data) {
        const output = await require("../Compiler/Build")(require("../Compiler/Interpreter")(command.code), data);
        let error = {};
        if (data.returnCode) return output;
        if (output.leftover.errorMessage && !output.leftover.ignoreErrors) error = output.leftover.errorMessage;
        if (output.leftover.suppressed) {
            if (output.leftover.suppressedMessage) error = output.leftover.suppressedMessage
            else error = new Error("");
        }

        if (error instanceof Error) error = await resolveError(error, this, output.leftover.data.message) || {};

        const body = {
            embeds: output.leftover.embeds,
            ephemeral: output.leftover.useEphemeral,
            ...output.leftover.sendOptions
        }

        if (output.result || error.content) body.content = output.result || error.content;

        if (output.leftover.data.interaction) return output.leftover.data.interaction.reply(body);
        return resolveMessage(output.leftover.data.channel, body);
    }



    // Alpha functions, just for lazys
    /**
     * Creates a command to list of IDs
     * @param {{
     * name: string,
     * aliases: Array<string> | string,
     * code: string
     * }} command
     * 
     * @deprecated Not recommended to be used anymore
     * @returns {Number}
     */
    createCommand(command) {
        const Id = 1000000 * Math.random();
        if (!"code" in command || !command.code) throw new Error("Command code is required!");
        if ("aliases" in command && !Array.isArray(command.aliases) && !command?.aliases?.every(v => typeof v === "string")) throw new TypeError("Command Aliases must be an Array of strings!");
        
        this.options._ALPHA_IDS.set(Id, command);
        return Id;
    }  

    /**
     * Assign command Id to event
     * @param {"messageCreate" | "messageDelete" | "guildMemberAdd" | "guildMemberRemove" | "ready" | "messageCreate" | "interactionCreate"} eventType
     * @param {Number} commandId 
     * @deprecated
     */
    assignType(eventType, commandId) {
        if (!Object.values(Alpha_Events).includes(eventType)) throw new Error(`Invalid event type of "${eventType}"!`);

        const command = this.options._ALPHA_IDS.get(commandId);
        if (!command) throw new Error(`Invalid command Id of "${commandId}"!`);
        this.registerCommand(eventType, command);
        
        // Clearing up memory usages / cache
        this.options._ALPHA_IDS.delete(commandId);
    }
}

module.exports = Script;