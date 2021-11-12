const { SlashCommandBuilder } = require('@discordjs/builders');
const mysql = require('mysql2/promise');
const db = require('./../repository.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rest')
		.setDescription('rest for 10 seconds'),
	async execute(interaction) {
		interaction.reply({ content: 'Resting ... ... ... ', ephemeral: true });
		await db.rest(interaction.user.tag);
		interaction.followUp({ content: 'Finished resting. You feel refreshed!', ephemeral: true })
	},
};