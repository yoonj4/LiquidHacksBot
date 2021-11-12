const { SlashCommandBuilder } = require('@discordjs/builders');
const { getCharacter } = require('../repository.js');
//const { getFighter } = require('../repository.js');

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
            // adds experience points to character 
            const exp = result.experience + 20;
            console.log(exp);
            // add exp
            interaction.reply({content:`${character}`, ephemeral: true});
		});
        /*
        const fighter = interaction.options.data[0].value;
        getFighter(fighter, (result) => {
            const fighter = result.experience + 20; 
        }); 
        */
        // connection.query(`SELECT * FROM smash_game.character WHERE `)
		//interaction.reply({content:`${input}`, ephemeral: true});
	},
};