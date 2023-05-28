const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const Playlist = require("../../settings/models/Playlist.js");

module.exports = {
    name: ["playlist", "remove"],
    description: "ลบเพลงจาก playlist",
    category: "Playlist",
    options: [
        {
            name: "name",
            description: "ขอชื่อของ playlist ด้วยจ้า",
            required: true,
            type: ApplicationCommandOptionType.String,
            autocomplete: true
        },
        {
            name: "postion",
            description: "ขอตำแหน่งของเพลงใน playlist ที่จะลบจ้า",
            required: true,
            type: ApplicationCommandOptionType.Integer
        }
    ],
    permissions: {
        channel: [],
        bot: [],
        user: []
    },
    settings: {
        isPremium: true,
        isPlayer: false,
        isOwner: false,
        inVoice: false,
        sameVoice: false,
    },
    run: async (interaction, client, user, language) => {
        await interaction.deferReply({ ephemeral: false });

        const name = interaction.options.getString("name");
        const position = interaction.options.getInteger("postion");

        const PName = name.replace(/_/g, ' ');
        const playlist = await Playlist.findOne({ name: PName });
        if(!playlist) return interaction.editReply(`${client.i18n.get(language, "playlist", "remove_notfound")}`);
        if(playlist.owner !== interaction.user.id) return interaction.editReply(`${client.i18n.get(language, "playlist", "remove_owner")}`);

        const song = playlist.tracks[position];
        if(!song) return interaction.editReply(`${client.i18n.get(language, "playlist", "remove_song_notfound")}`);

        playlist.tracks.splice(position - 1, 1);
        await playlist.save();

        const embed = new EmbedBuilder()
            .setDescription(`${client.i18n.get(language, "playlist", "remove_removed", {
                name: PName,
                position: position
                })}`)
            .setColor(client.color)

        return interaction.editReply({ embeds: [embed] });
    }
}