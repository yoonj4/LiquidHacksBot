const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('../repository.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Display your stats. Default: yourself. Optional: username')
		.addStringOption(option =>
            option.setName('username')
				.setDescription('Lookup another user\'s stats')
                .setRequired(false)),
    async execute(interaction) {

		let username = (interaction.options.data.length == 0) ? interaction.user.username : interaction.options.data[0].value;
		
		if (interaction.options.data.length == 0) {
			// Lookup stats for inputted user
			statReport(await db.checkDiscordTag(interaction.user.username, interaction.guildId))
		} 
		else {
			// Lookup user's stats
			statReport(await db.checkDiscordTag(username, interaction.guildId))
		}

        function statReport(result) {
            if (result === false) {
                if (interaction.options)
				interaction.reply(
					{
						content: username + ' does not exist.',
						ephemeral: true
					}
				);
            } 
			else {
                characterObj = result;
                const status = (characterObj.is_resting === 1) ? 'Resting' : 'Rested';
                interaction.reply(
					{
						content: `Stats for ${characterObj.name} (${status}):\n      Prize Money: $${characterObj.prize_money}\n      Experience: ${characterObj.experience}\n      Stamina: ${characterObj.stamina}`, 
						ephemeral: true
					}
				);
            }
        };
    },
};