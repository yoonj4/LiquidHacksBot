const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
// Require the necessary discord.js classes
const { token, guildId } = require('./config.json');
const { ToadScheduler, SimpleIntervalJob, Task } = require('toad-scheduler');
const { canLocalStart } = require('./repository.js');

const scheduler = new ToadScheduler();
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
let generalChannel;

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(token).then(() => {
	generalChannel = client.channels.cache.find(channel => channel.name == 'general');
	const task = new Task('start tournament', startTournament);
	const job = new SimpleIntervalJob({ minutes: 5, runImmediately: false}, task);
	scheduler.addSimpleIntervalJob(job);	
});

async function startTournament() {
    if (await canLocalStart()) {
		const guild = await client.guilds.fetch(guildId);
        const tournamentSignupMessage = await generalChannel.send('A local tournament is beginning. Please sign up. You have five minutes.');
		tournamentSignupMessage.react('🇾');
		let max = Math.min(8, guild.members.cache.filter(member => !member.user.bot).size);
		console.log(max);
		const filter = (reaction, user) => {
			console.log('get called');
			return reaction.emoji.name == '🇾';
		};
		tournamentSignupMessage.awaitReactions({ maxUsers: max, time: 30000 })
			.then(collected => {
				generalChannel.send('Got ' + collected.size + ' participants');
			});
    }
}