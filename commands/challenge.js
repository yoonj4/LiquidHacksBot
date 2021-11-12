const { SlashCommandBuilder } = require('@discordjs/builders');
const { ssbuRoster } = require('../resources/roster.js');
const mysql = require('mysql2/promise');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('challenge')
		.setDescription('Challenge another person in your server')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('The person you want to fight')
                .setRequired(true)),
	async execute(interaction) {
		let opponent = interaction.options.data[0].value;
		let opponentExists = false;
		
		let [rows, fields] = await connection.execute(`SELECT COUNT(*) AS count FROM smash_game.\`character\` WHERE name = ?`, [opponent]);
		console.log(rows);
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