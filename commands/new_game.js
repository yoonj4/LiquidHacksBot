const { SlashCommandBuilder } = require('@discordjs/builders');
const Character = require('../character.js');
const { ssbuRoster } = require('../resources/roster.js');
const db = require('../repository.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newgame')
		.setDescription('Create a new character')
        .addStringOption(option =>
            option.setName('username')
				.setDescription('Name with no spaces max character limit of 20')
                .setRequired(true))
		.addStringOption(option =>
			option.setName('fighter')
				.setDescription('Enter your favorite fighter')
				.setRequired(true)),
	execute(interaction) {
		let username = interaction.options.data[0].value;
		const guildId = interaction.guildId;

		username = username.replace(/\s+/g, '');

		if(username.length > 20) {
			interaction.reply({ content: 'Username is too long', ephemeral: true });
		} 
		let fighter = interaction.options.data[1].value.toUpperCase();
		// check if fighter input is in roster. If not, reply and exit program
		if(ssbuRoster.has(fighter) === false) {
			return interaction.reply({ content: 'Fighter doesn\'t exist', ephemeral: true });
		}
		// check if discord tag exists
		let result = db.checkDiscordTag(interaction.user.tag, guildId);
		
		if(result === false) {
			const character = new Character(username, false, fighter, interaction.user.tag);
			
			db.insertCharacter(character, guildId);
			interaction.reply({ content: `Welcome to our discord game, ${username}!`, ephemeral: true });
		} else {
			return interaction.reply({ content: `${username} already exists!`, ephemeral: true}); 
		}
	},
};
