const Character = require('./character.js')
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

async function insertCharacter(character) {
    const [rows] = await getConnection().execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro) values(?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro]);
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
    const [rows] = await getConnection().execute('select count(*) as num_players from smash_game.character');
    return rows[0].num_players > 1;
}

async function getConnection() {
    return await connection;
}

module.exports = { insertCharacter, canLocalStart };
