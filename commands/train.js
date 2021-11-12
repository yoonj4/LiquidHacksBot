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
        let fighter = interaction.options.data[0].value;
        const stamina = 10;
        const exp = 20; 
        fighter = await (repository.addExperience(interaction.user.tag, exp, stamina, fighter.toUpperCase()));
        interaction.reply({content: `Stats increased!\nFighter: ${fighter[0].name}\nExperience: ${fighter[0].experience - 20} + ${exp} (${fighter[0].experience})`, ephemeral: true});
    },
};