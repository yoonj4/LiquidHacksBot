const Character = require('./character.js')
// const checkNames = require('./commands/stats')
const mysql = require('mysql2/promise');

module.exports = async function insertCharacter(character) {
    let connection = await mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'smash_game'
    });

    connection.connect();
    let [rows, fields] = await connection.execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro) values(?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro]);
    const char_id = rows.insertId;
    const fighter_prof = character.fighter_pool.only();
    await connection.execute('insert into smash_game.`fighter_proficiency`(character_id, experience, name) values(?, ?, ?)', [char_id, fighter_prof.experience, fighter_prof.name]);

    connection.end();
}