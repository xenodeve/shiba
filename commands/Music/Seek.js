const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const formatDuration = require('../../structures/FormatDuration.js');

module.exports = {
    name: ["music", "seek"],
    description: "หาเวลาในเพลง!",
    category: "Music",
    options: [
        {
            name: "seconds",
            description: "จำนวนวินาทีในการหา.",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        }
    ],
    permissions: {
        channel: [],
        bot: [],
        user: []
    },
    settings: {
        isPremium: false,
        isPlayer: true,
        isOwner: false,
        inVoice: false,
        sameVoice: true,
    },
    run: async (interaction, client, user, language, player) => {
        await interaction.deferReply({ ephemeral: false });
        
        const value = interaction.options.getInteger("seconds");
        if(value * 1000 >= player.playing.length || value < 0) return interaction.editReply(`${client.i18n.get(language, "music", "seek_beyond")}`);
        await player.seek(value * 1000);

        const Duration = formatDuration(player.position);

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "seek_msg", {
                duration: Duration
            })}`)
            .setColor(client.color);

        interaction.editReply({ embeds: [embed] });
    }
}