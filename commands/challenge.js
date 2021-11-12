const { SlashCommandBuilder } = require('@discordjs/builders');
const { ssbuRoster } = require('../resources/roster.js');
const mysql = require('mysql2/promise');
const { challenges } = require('../index.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('challenge')
		.setDescription('Challenge another person in your server')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('Enter their in-game name')
                .setRequired(true)),
	async execute(interaction) {
		
		// find opponent's ID to direct message them through discord
		let user = interaction.user.username
		let opponent = interaction.options.data[0].value;
		const guildId = interaction.guildId

		if (checkDiscordTag(opponent, guildId) == false) {
			await interaction.reply({context: 'No player with this name in this game or server.', ephemeral: true});
			return;
		}

		// If an opposing challenge has already been issued, commence fight. If not, add your challenge to the list.
		challenges.forEach(element => { 
			if (element[0] == opponent && element[1] == user) {
				
			}
		})
		
		

		

		

// TODO Need to add string option so it is /challenge [fighter] to quicken the process.
// TODO Need to send prompt to opponent for acceptance. Opponent accepts challenge and chooses fighter by simply typing a [fighter]. Any other input exits challenge.
		if (rows[0].count == 0) {
			await interaction.reply({context: opponent + ' exists!', ephemeral: true});

		} else {
			await interaction.reply({context: 'No player with this name in the game.', ephemeral: true});
		}  
		await interaction.reply({context: 'end challenge', ephemeral: true});
	}
};