const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
        await interaction.reply(`name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};