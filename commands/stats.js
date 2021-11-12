const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkDiscordTag } = require('../check_tag.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('displays info of user profile'),
	execute(interaction) {
		let characterObj = '';
		checkDiscordTag(interaction.user.tag, (result) => {
			if(result === false) {
				interaction.reply({content: 'stats for user doesn\'t exist please create a user', ephemeral: true});
			} else {
				characterObj = result;
				const status = (characterObj.is_resting === 1) ? 'resting' : 'rested'; 
				interaction.reply({content: `Stats for ${characterObj.name} (${status}):\n		Prize Money: $${characterObj.prize_money}\n		Experience: ${characterObj.experience}\n		Stamina: ${characterObj.stamina}`, ephemeral: true});
			}
		});
	},
};