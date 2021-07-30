
module.exports = 
/**
 * 
 * @param {import("../main/Client")} This 
 */
    This => {
        /**
         * 
         * @param {import("discord.js").Interaction} interaction 
         */
        async function onInteractionCreate(interaction) {
            const commands = This.options.botCommands.filter((c, k) => k.startsWith("C-interactionCreate") && c.name === (interaction.customId || interaction.commandName)).array();
            
            for (const c of commands) This._compile(c,
                {
                    bot: This, // shouldn't be used when sharding, maybe it will be removed someday
                    client: interaction.client,
                    member: interaction.member,
                    guild: interaction.guild,
                    channel: interaction.channel,
                    message: interaction.message,
                    author: interaction.member.user,
                    interaction
                })
        }

        return onInteractionCreate
    }