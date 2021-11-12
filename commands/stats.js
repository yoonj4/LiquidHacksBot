const { SlashCommandBuilder } = require('@discordjs/builders');
const mysql = require('mysql2');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'smash_game'
});

connection.connect((err) => {
	if (err) throw err;
	console.log('Connected!');
});

function checkNames(datafield) {
	connection.query(`SELECT ${datafield} FROM smash_game.character`, (err, columns) => {
		if(err) throw err;
		
		console.log('Data received from Db:');
		const dataColumn = columns; 
		console.log(dataColumn);
	});
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stats')
		.setDescription('displays info of user profile'),
	async execute(interaction) {
        await interaction.reply(`name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	},
};