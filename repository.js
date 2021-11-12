const Character = require('./character.js')
const checkNames = require('./commands/stats')
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

async function insertCharacter(character) {
    connection.connect();
    let [rows, fields] = await connection.execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro) values(?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro]);
    const char_id = rows.insertId;
    const fighter_prof = character.fighter_pool.only();
    await connection.execute('insert into smash_game.`fighter_proficiency`(character_id, experience, name) values(?, ?, ?)', [char_id, fighter_prof.experience, fighter_prof.name]);

    connection.end();
}

async function addExperience(exp, character_id) { // Zach - may not need character_id pram?
    connection.connect();
    await connection.execute('update smash_game.character set experience = experience + exp where character_id'); // Zach - test to make sure that this works
    connection.end();
}

async function levelUp(remainder) {
    // print message to player
    // update character experience
    connection.connect();
    await connection.execute('update smash_game.character set experience = remainder where character_id')
    connection.end();
}
