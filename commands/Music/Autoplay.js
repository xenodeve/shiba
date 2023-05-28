const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: ["music", "autoplay"],
    description: "ให้ฟอคเล่นเพลงให้เองนะ",
    category: "Music",
    permissions: {
        channel: [],
        bot: [],
        user: []
    },
    settings: {
        isPremium: true,
        isPlayer: true,
        isOwner: false,
        inVoice: false,
        sameVoice: true,
    },
    run: async (interaction, client, user, language, player) => {
        await interaction.deferReply({ ephemeral: false });

        const autoplay = player.get("autoplay");
        if (autoplay === true) {
            await player.set("autoplay", false);

            const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "music", "autoplay_off")}`)
                .setColor(client.color);

            return interaction.editReply({ embeds: [embed] });
        } else {
            const identifier = player.queue.current.identifier;
            const search = `https://www.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
            const res = await player.search(search, interaction.user);

            await player.set("autoplay", true);
            await player.set("requester", interaction.user);
            await player.set("identifier", identifier);
            try {
                await player.queue.add(res.tracks[1]);
            } catch (e) {
                return interaction.editReply(`**Autoplay Support Youtubeเท่านั้น!**`);
            }

            const embed = new EmbedBuilder()
                .setDescription(`${client.i18n.get(language, "music", "autoplay_on")}`)
                .setColor(client.color)
                .setTimestamp()
                //.setFooter(client.footer);

            return interaction.editReply({ embeds: [embed] });
        }
    }
}