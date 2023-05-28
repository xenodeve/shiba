const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: ["music", "move"],
    description: "เปลี่ยนตำแหน่งเพลงในคิวเด้อ.",
    category: "Music",
    options: [
        {
            name: "from",
            description: "หมายเลขคิวของเพลง",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "to",
            description: "ตำแหน่งในคิวที่ต้องการย้าย",
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

        const tracks = interaction.options.getInteger("from");
        const position = interaction.options.getInteger("to");

        if (tracks == 0 && position == 0) return interaction.editReply(`${client.i18n.get(language, "music", "move_already")}`);
        if (tracks > player.queue.length || (tracks && !player.queue[tracks - 1])) return interaction.editReply(`${client.i18n.get(language, "music", "move_notfound")}`);
        if ((position > player.queue.length) || !player.queue[position - 1]) return interaction.editReply(`${client.i18n.get(language, "music", "move_notfound")}`);

        const song = player.queue[tracks - 1];

        await player.queue.splice(tracks - 1, 1);
        await player.queue.splice(position - 1, 0, song);

        const embed = new EmbedBuilder()
            .setColor(client.color) //**Moved • [${song.title}](${song.uri})** to ${position}
            .setDescription(`${client.i18n.get(language, "music", "move_desc", {
                name: song.title,
                url: song.uri,
                pos: position
            }) }`)

        return interaction.editReply({ embeds: [embed] });
    }
}
