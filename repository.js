const Character = require('./character.js')
const mysql = require('mysql2/promise');

<<<<<<< HEAD
const connection = await mysql.createConnection({
=======
const connection = mysql.createConnection({
>>>>>>> master
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

async function insertCharacter(character) {
<<<<<<< HEAD
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
=======
    const [rows] = await getConnection().execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro) values(?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro]);
    const char_id = rows.insertId;
    const fighter_prof = character.fighter_pool.only();
    return connection.execute('insert into smash_game.`fighter_proficiency`(character_id, experience, name) values(?, ?, ?)', [char_id, fighter_prof.experience, fighter_prof.name]);

}

async function canLocalStart() {
    const [rows] = await getConnection().execute('select count(*) as num_players from smash_game.character');
    return rows[0].num_players > 1;
}

async function getConnection() {
    return await connection;
}

module.exports = { insertCharacter, canLocalStart };
>>>>>>> master
