const { SlashCommandBuilder } = require('@discordjs/builders');
const Character = require('../character.js');
const { checkDiscordTag } = require('../check_tag.js');
const insertCharacter = require('../repository.js');
const { ssbuRoster } = require('../resources/roster.js');

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
	execute(interaction) {
		let username = interaction.options.data[0].value;
		username = username.replace(/\s+/g, '');

		if(username.length > 20) {
			interaction.reply({ content: 'username is too long', ephemeral: true });
		} 
		let fighter = interaction.options.data[1].value.toUpperCase();
		// check if fighter has roster
		if(ssbuRoster.has(fighter) === false) {
			interaction.reply({ content: 'fighter doesn\'t exist', ephemeral: true });
		}

		// check if discord tag exists
		checkDiscordTag(interaction.user.tag, (result) => {
			if(result === false) {
				const character = new Character(username, false, fighter, interaction.user.tag);
				insertCharacter(character);
				interaction.reply({ content: `Welcome to our discord game, ${username}!`, ephemeral: true });
			} else {
				interaction.reply({ content: `${interaction.user.tag} already exists!`, ephemeral: true}); 
			}
		})
	},
};
