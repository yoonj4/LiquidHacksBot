const { SlashCommandBuilder } = require('@discordjs/builders');
const mysql = require('mysql2/promise');
const db = require('./../repository.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rest')
		.setDescription('rest for 5 minutes'),
	async execute(interaction) {
		
		interaction.reply({ content: 'Resting ... ... ... ', ephemeral: true });
		
		await connection.execute('UPDATE smash_game.`character` SET is_resting = true WHERE discord_id = ?', [interaction.user.tag]);
        await new Promise(r => setTimeout(r, 300*1000)); //in milliseconds
		await connection.execute('UPDATE smash_game.`character` SET is_resting = false WHERE discord_id = ?', [interaction.user.tag]);
        interaction.followUp({ content: 'Finished resting. You feel refreshed!', ephemeral: true })
		
		connection.end();
	},
};