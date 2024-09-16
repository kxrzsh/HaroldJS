const { EmbedBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    data: {
        name: 'restart',
        description: 'Restarts the bot.',
    },
    async execute(interaction) {
        const ownerId = process.env.OWNER_ID;

        if (interaction.user.id !== ownerId) {
            return interaction.reply({
                content: 'You do not have permission to use this command.',
                ephemeral: true,
            });
        }

        const embed = new EmbedBuilder()
            .setColor(0x00AE86)
            .setTitle('Restarting...');

        try {
            await interaction.reply({ embeds: [embed] });

            console.log('Bot restart initiated. The bot will be back online shortly.');

            exec('pm2 restart Harold', (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    interaction.followUp({
                        content: 'Failed to restart the bot. Make sure the bot is running with the correct name.',
                        ephemeral: true,
                    });
                    return;
                }

                console.log('Bot successfully restarted!');
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);

                setTimeout(() => {
                    interaction.channel.send({
                        content: 'Bot successfully restarted!',
                        embeds: [
                            new EmbedBuilder()
                                .setColor(0x00AE86)
                                .setTitle('Restart Successful')
                                .setDescription('The bot has been successfully restarted.'),
                        ],
                    });
                }, 5000);
            });
        } catch (error) {
            console.error(`Failed to execute restart command: ${error}`);
            if (!interaction.replied) {
                await interaction.reply({
                    content: 'There was an error executing this command!',
                    ephemeral: true,
                });
            } else {
                await interaction.followUp({
                    content: 'There was an error executing this command!',
                    ephemeral: true,
                });
            }
        }
    }
};
