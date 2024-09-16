const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'ping',
        description: 'Shows the bot\'s ping and API latency.',
    },
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0x00AE86)
            .setDescription(`🏓Ping: ${Math.round(interaction.client.ws.ping)}ms\n⏳API Latency: ${Date.now() - interaction.createdTimestamp}ms`);

        try {
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(`Failed to execute ping command: ${error}`);
            try {
                await interaction.followUp({
                    content: 'There was an error executing this command!',
                    ephemeral: true,
                });
            } catch (err) {
                console.error(`Failed to send error message: ${err}`);
            }
        }
    }
};
