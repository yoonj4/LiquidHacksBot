const { SlashCommandBuilder } = require('@discordjs/builders');
const { ssbuRoster } = require('../resources/roster.js');
const mysql = require('mysql2/promise');
const match = require('../match.js');
const {Character, fromDb} = require('../character.js');
const db = require('../repository.js')


let challenges = [];

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
		let user = (await db.getCharacter(interaction.user.tag))[0].character_name
		let opponent = interaction.options.data[0].value;
		const guildId = interaction.guildId

		let opponentTag = await db.getDiscordTag(opponent, guildId)
		if (await db.checkDiscordTag(opponentTag, guildId) == false) {
			interaction.reply({content: 'No player with this name in this game or server.', ephemeral: true});

			return;
		};

		console.log(challenges);
		// If an opposing challenge has already been issued, choose your fighter and fight. 
		// If not, add your challenge to the list.
		for (let i = 0; i < challenges.length; i++ ) {
			if (challenges[i][0] == opponent && challenges[i][1] == user) {
				console.log("entered if statement")
				userFighter = interaction.options.data[1].value.toUpperCase();
				opponentFighter = challenges[i][2].toUpperCase();
				challenges.splice(i,1); // remove challenge from list

				await interaction.reply(
					{content: 	`\n
					${user} has accepted ${opponent}\'s challenge!\n
					${user}\'s ${userFighter} is up against ${opponent}\'s ${opponentFighter}!\n`
				});
				
				// TODO insert button to play ssbu announcer voiceline "ready......GO"
				
				let char1 = fromDb(await db.getCharacter(interaction.user.tag));
				let char2 = fromDb(await db.getCharacter(opponentTag));
				
				console.log("before match")
				let winner = match(char1, char2, char1.fighter_pool.filter(f => f.name === userFighter).only(), char2.fighter_pool.filter(f => f.name === opponentFighter).only());
				await interaction.followUp({content: `${winner.name} wins!`});
				return;
			};
		};
		
		challenges.push([user, opponent, interaction.options.data[1].value]);
		console.log(user)
		console.log(opponent)
		await interaction.reply( { content: `${user} has challenged ${opponent}!` } );
		return;
	}
};