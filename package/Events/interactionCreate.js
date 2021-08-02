
module.exports = 
/**
 * 
 * @param {import("../main/Client")} This 
 */
    () => {
        /**
         * 
         * @param {import("discord.js").Interaction} interaction 
         */
        async function onInteractionCreate(interaction) {
            const commands = Array.from(interaction.client.dbdjsProgram.options.botCommands.filter((c, k) => k.startsWith("C-interactionCreate") && c.name === (interaction.customId || interaction.commandName)));

            for (const c of commands) interaction.client.dbdjsProgram._compile(c,
                {
                    bot: interaction.client.dbdjsProgram, // shouldn't be used when sharding, maybe it will be removed someday
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