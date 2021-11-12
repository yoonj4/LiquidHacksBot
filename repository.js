const Character = require('./character.js')
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

async function insertCharacter(character) {
    const [rows] = await (await connection).execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro) values(?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro]);
    const char_id = rows.insertId;
    const fighter_prof = character.fighter_pool.only();
    (await connection).execute('insert into smash_game.`fighter_proficiency`(character_id, experience, name) values(?, ?, ?)', [char_id, fighter_prof.experience, fighter_prof.name]);
}

async function canLocalStart() {
    const [rows] = await (await connection).execute('select count(*) as num_players from smash_game.character');
    return rows[0].num_players > 1;
}

async function rest(username, restTimer) {
    await (await connection).execute('UPDATE smash_game.`character` SET is_resting = true WHERE discord_tag = ?', [username]);
    await (await connection).execute('UPDATE smash_game.`character` SET stamina = 100 WHERE discord_tag = ?', [username]);
    await new Promise(r => setTimeout(r, restTimer));
    (await connection).execute('UPDATE smash_game.`character` SET is_resting = false WHERE discord_tag = ?', [username]);
}

async function checkDiscordTag(username, guildId) {
    const [rows,field] = await (await connection).execute('SELECT * FROM smash_game.character WHERE name = ? AND guild_id = ?', [username, guildId]);
    if (rows.length == 0) {
        return false;
    }
    else {
        return rows[0];
    }
}

module.exports = {
    insertCharacter,
    canLocalStart,
    rest,
    checkDiscordTag
};
