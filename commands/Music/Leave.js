const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: ["music", "leave"],
    description: "พาฟอคออกจากห้อง",
    category: "Music",
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
        
        const { channel } = interaction.member.voice;

        await player.destroy();
        await client.UpdateMusic(player);
        await client.clearInterval(client.interval);

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "music", "leave_msg", {
                channel: channel.name
            })}`)
            .setColor(client.color)
            .setTimestamp();

        return interaction.editReply({ embeds: [embed] })
    }
}
