const { SlashCommandBuilder } = require('@discordjs/builders');
const Character = require('../character.js');

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
		let roster = ['MARIO', 'DONKEY KONG', 'LINK', 'SAMUS', 'DARK SAMUS', 'YOSHI', 'KIRBY', 'FOX'];
		roster = new Set(roster);
		if(roster.has(fighter)) {
			const character = new Character(username, false, fighter); 
			console.log(JSON.stringify(character)); 
		} else {
			await interaction.followUp({ content: 'fighter doesn\'t exist', ephemeral: true });
		}
		await interaction.reply({ content: `Welcome to our discord game, ${username}!`, ephemeral: true });
	},
};

