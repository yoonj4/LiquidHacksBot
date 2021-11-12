const { SlashCommandBuilder } = require('@discordjs/builders');
const repository = require('../repository.js');
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
        // interaction.reply({content:`${character}`, ephemeral: true});
        const exp = 20; 
        repository.addExperience(interaction.user.tag, exp);
        // console.log(character);
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