const { SlashCommandBuilder } = require('@discordjs/builders');
const repository = require('../repository.js');
const mysql = require('mysql2/promise');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('train')
        .setDescription('train specific fighter')
        .addStringOption(option =>
            option.setName('fighter')
                .setDescription('choose fighter')
                .setRequired(true)),
    async execute(interaction) {
        // stamina goes down, experience goes up
        const character = await repository.getCharacter(interaction.user.tag);
        if(character[0].stamina === 0) {
            interaction.reply({content: 'you are too tired to train', ephemeral: true});
        } else {
             // editable to your liking my liege 
             const stamina = 10;
             const exp = 20; 

            // you need both character id and fighter name
            const fighter = await repository.getFighter(character[0].character_id, interaction.options.data[0].value);
            if(fighter === undefined) {
                interaction.reply({content: `${fighter[0].name} does not exist for user: ${character[0].discord_tag}`});
            } else {
                // add experience
                repository.addExperience(character[0].discord_tag, fighter[0].name, exp);
                // decrease stamina
                repository.decreaseStamina(character[0].character_id, stamina);
                // Experience increased
                interaction.reply({content: `Experience Increased!\nFighter: ${fighter[0].name}\nExperience: ${fighter[0].experience - exp} + ${exp} (Total: ${fighter[0].experience})`, ephemeral: true});
            }
        }
    },
};
