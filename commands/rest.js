const { SlashCommandBuilder } = require('@discordjs/builders');
const mysql = require('mysql2/promise');
const db = require('./../repository.js');

var restTimer = 12 * 1000; // in milliseconds

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rest')
		.setDescription('Rest and Recover your stamina. Disables /train and /onlinematch for ' + restTimer/1000 + ' seconds'),
	async execute(interaction) {
		interaction.reply({ content: 'Resting ... ... ... ', ephemeral: true });
		await db.rest(interaction.user.tag, restTimer);
		interaction.followUp({ content: 'Finished resting. You feel refreshed!', ephemeral: true })
	},
};