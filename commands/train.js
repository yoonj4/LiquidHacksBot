const { SlashCommandBuilder } = require('@discordjs/builders');
const { getCharacter } = require('../get_character.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('train')
		.setDescription('train specific fighter')
        .addStringOption(option =>
            option.setName('fighter')
				.setDescription('choose fighter')
                .setRequired(true)),
	execute(interaction) {
        getCharacter(interaction.user.tag, (result) => {
            const characterId = result.character_id;
            interaction.reply({content:`${characterId}`, ephemeral: true});
		});
        const input = interaction.options.data[0].value;
        

        // connection.query(`SELECT * FROM smash_game.character WHERE `)
		//interaction.reply({content:`${input}`, ephemeral: true});
	},
};