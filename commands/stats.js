const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkDiscordTag } = require('../check_tag.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('displays info of user profile'),
	execute(interaction) {
		let characterObj = '';
		checkDiscordTag(interaction.user.tag, (result) => {
			characterObj = result;
			interaction.reply({content: `Stats for ${characterObj.name}\n		Prize Money: ${characterObj.prize_money}$\n		Experience: ${characterObj.experience}\n		Stamina: ${characterObj.stamina}`, ephemeral: true});
		});
	},
};