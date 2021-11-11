const { SlashCommandBuilder } = require('@discordjs/builders');
const Character = require('../character.js');
const insertCharacter = require('../repository.js');
const startTournament = require('../tournament.js');
const { ssbuRoster } = require('../resources/roster.js');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');

const scheduler = new ToadScheduler();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newgame')
		.setDescription('prompts for username')
        .addStringOption(option =>
            option.setName('username')
				.setDescription('name with no spaces max character limit of 20')
                .setRequired(true))
		.addStringOption(option =>
			option.setName('fighter')
				.setDescription('choose fighter')
				.setRequired(true)),
	async execute(interaction) {
		let username = interaction.options.data[0].value;
		username = username.replace(/\s+/g, '');
		let fighter = interaction.options.data[1].value.toUpperCase();
		if(username.length > 20) {
			await interaction.reply({ content: 'username is too long', ephemeral: true });
			return;
		}
		
		const roster = ssbuRoster;
		if(roster.has(fighter)) {
			const character = new Character(username, false, fighter); 
			insertCharacter(character);
			await interaction.reply({ content: `Welcome to our discord game, ${username}!`, ephemeral: true });
		} else {
			await interaction.reply({ content: 'Fighter doesn\'t exist.', ephemeral: true });
		}

		const task = new Task('start tournament', startTournament);
		const job = new SimpleIntervalJob({ seconds: 20, }, task);
		scheduler.addSimpleIntervalJob(job);
	},
};