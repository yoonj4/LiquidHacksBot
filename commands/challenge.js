const { SlashCommandBuilder } = require('@discordjs/builders');
const { ssbuRoster } = require('../resources/roster.js');
const mysql = require('mysql2/promise');
const { challenges } = require('../index.js');
const match = require('../match.js');
const Character = require('../character.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('challenge')
		.setDescription('Challenge another person in your server')
        .addStringOption(option =>
            option.setName('player')
                .setDescription('Enter their in-game name')
                .setRequired(true))
		.addStringOption(option =>
            option.setName('fighter')
                .setDescription('Choose your fighter!')
                .setRequired(true)),
	async execute(interaction) {
		
		// find opponent's ID to direct message them through discord
		let user = interaction.user.username
		let opponent = interaction.options.data[0].value;
		const guildId = interaction.guildId

		if (checkDiscordTag(opponent, guildId) == false) {
			await interaction.reply({context: 'No player with this name in this game or server.', ephemeral: true});
			return;
		};

		// If an opposing challenge has already been issued, choose your fighter and fight. 
		// If not, add your challenge to the list.
		for (let i = 0; i < challenges.length; i++ ) {
			if (challenges[i][0] == opponent && challenges[i][1] == username) {

				userFighter = interaction.options.data[1].value;
				opponentFighter = challenges[i][2];
				challenges.splice(i,1); // remove challenge from list

				await interaction.reply(
					{context: 	`${user} has accepted ${opponent}\'s challenge!\n
					${user}\'s ${userFighter} is up against ${opponent}\'s ${opponentFighter}!\n`
				});
				
				// TODO insert button to play ssbu announcer voiceline "ready......GO"
				
				let char1 = Character(getCharacter(interaction.user.tag));
				let char2 = Character(getCharacter(getDiscordTag(opponent,guildId)));
				
				let winner = match(char1, char2, userFighter, opponentFighter);
				await interaction.followUp({context: `${winner.name} wins!`});
				return;
			};
		};
		
		challenges.push([user, opponent]);
		await interaction.reply( {context: `${user} has challenged ${opponent}!`});
		return;
	}
};