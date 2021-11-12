const Character = require('./character.js')
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

async function insertCharacter(character, guildId) {
    const [rows] = await (await connection).execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro, discord_tag, guild_id) values(?, ?, ?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro, character.character_tag, guildId]);
    const char_id = rows.insertId;
    const fighter_prof = character.fighter_pool.only();
    return connection.execute('insert into smash_game.`fighter_proficiency`(character_id, experience, name) values(?, ?, ?)', [char_id, fighter_prof.experience, fighter_prof.name]);
}

async function addExperience(exp, character_id) { // Zach - may not need character_id pram?
    await getConnection().execute('update smash_game.character set experience = experience + exp where character_id'); // Zach - test to make sure that this works
}

async function addFighterProficiency(fp) {
    await getConnection().execute('update smash_game.fighter_proficiency set experience = experience + fp where fp_id')
}

async function levelUp(remainder) {
    // print message to player
    // update character experience
    await getConnection().execute('update smash_game.character set experience = remainder where character_id')
}

async function decreaseStamina(stamina) {
    
}

async function increaseStamina(stamina) {

}

async function getSmashLv() {
    return;
}

async function chooseFighter() {
    return;
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

async function addExperience(tag, exp, stamina, fighter) {
    const [row] = await (await connection).execute(`SELECT * FROM smash_game.fighter_proficiency WHERE smash_game.fighter_proficiency.name =\'${fighter}\'`);
    await (await connection).execute(`UPDATE smash_game.character INNER JOIN smash_game.fighter_proficiency ON smash_game.fighter_proficiency.character_id = smash_game.character.character_id SET smash_game.character.experience = smash_game.character.experience + ${exp}, smash_game.fighter_proficiency.experience = smash_game.fighter_proficiency.experience + ${exp}, smash_game.character.stamina = smash_game.character.stamina - ${stamina} WHERE smash_game.character.discord_tag = \'${tag}\' AND smash_game.fighter_proficiency.name = \'${fighter}\'`); 
    return row; 
}

async function getCharacter(tag) {
    const [character] = await (await connection).execute(`SELECT * FROM smash_game.character WHERE smash_game.character.discord_tag =\'${tag}\'`);  
    return character; 
}

module.exports = { 
    addExperience, 
    canLocalStart,
    checkDiscordTag,
    getCharacter,
    insertCharacter,
    rest,
};
