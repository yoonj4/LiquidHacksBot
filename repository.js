const Character = require('./character.js')
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

async function insertCharacter(character, guildId) {
    const [rows] = await (await connection).execute('insert into smash_game.character(name, discord_tag, guild_id) values(?, ?, ?)', [character.name, character.discord_tag, guildId]);
    const char_id = rows.insertId;
    const fighter_prof = character.fighter_pool.only();
    return await (await connection).execute('insert into smash_game.`fighter_proficiency`(character_id, experience, name) values(?, ?, ?)', [char_id, fighter_prof.experience, fighter_prof.name]);
}

/*
async function addFighterProficiency(fp) {
    await getConnection().execute('update smash_game.fighter_proficiency set experience = experience + fp where fp_id')
}

async function levelUp(remainder) {
    // print message to player
    // update character experience
    await getConnection().execute('update smash_game.character set experience = remainder where character_id')
}

async function increaseStamina(stamina) {

}

async function getSmashLv() {
    return;
}

async function chooseFighter() {
    return;
}
*/

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

async function checkDiscordTag(tag, guildId) {
    const [rows,field] = await (await connection).execute('SELECT * FROM smash_game.character WHERE discord_tag = ? AND guild_id = ?', [tag, guildId]);
    if (rows.length == 0) {
        return false;
    }
    else {
        return rows[0];
    }
}

async function getDiscordTag(name, guildId) {
    const [rows,field] = await (await connection).execute('SELECT discord_tag FROM smash_game.character WHERE name = ? AND guild_id = ?', [name, guildId]);
    if (rows.length == 0) {
        return false;
    }
    else {
        return rows[0];
    }
}

async function addExperience(tag, fighter, exp) {
    const [row] = await (await connection).execute(`SELECT * FROM smash_game.fighter_proficiency WHERE smash_game.fighter_proficiency.name =\'${fighter}\'`);
    await (await connection).execute(`UPDATE smash_game.character INNER JOIN smash_game.fighter_proficiency ON smash_game.fighter_proficiency.character_id = smash_game.character.character_id SET smash_game.character.experience = smash_game.character.experience + ${exp}, smash_game.fighter_proficiency.experience = smash_game.fighter_proficiency.experience + ${exp} WHERE smash_game.character.discord_tag = \'${tag}\' AND smash_game.fighter_proficiency.name = \'${fighter}\'`); 
    return row; 
}

async function decreaseStamina(tag, stamina) {
    await (await connection).execute(`UPDATE smash_game.character INNER JOIN smash_game.fighter_proficiency ON smash_game.fighter_proficiency.character_id = smash_game.character.character_id SET smash_game.character.stamina = smash_game.character.stamina - ${stamina} WHERE smash_game.character.discord_tag = \'${tag}\'`);
}

async function getCharacter(tag) {
    const [character] = await (await connection).execute(`SELECT * FROM smash_game.character WHERE smash_game.character.discord_tag =\'${tag}\'`);  
    if(character === undefined) {
        console.log('character does not exist!');
    } else {
        return character;
    }
}

async function getFighter(id, name) {
    const [fighter] = await (await connection).execute(`SELECT * FROM smash_game.fighter_proficiency WHERE smash_game.fighter_proficiency.character_id = ${id} AND smash_game.fighter_proficiency.name = \'${name}\'`); 
    if(fighter === undefined) {
        console.log('fighter does not exist!');
    } else {
        return fighter;
    }
}

module.exports = { 
    addExperience, 
    canLocalStart,
    checkDiscordTag,
    decreaseStamina,
    getCharacter, 
    getDiscordTag,
    getFighter,
    insertCharacter,
    rest,
};
