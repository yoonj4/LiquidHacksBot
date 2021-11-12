const Character = require('./character.js')
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

async function insertCharacter(character) {
    const [rows] = await (await getConnection()).execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro) values(?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro]);
    const char_id = rows.insertId;
    const fighter_prof = character.fighter_pool.only();
    (await connection).execute('insert into smash_game.`fighter_proficiency`(character_id, experience, name) values(?, ?, ?)', [char_id, fighter_prof.experience, fighter_prof.name]);
}

async function canLocalStart() {
    const [rows] = await (await getConnection()).execute('select count(*) as num_players from smash_game.character');
    return rows[0].num_players > 1;
}

async function getConnection() {
    return await connection;
}

async function getCharacter(tag, callback) {    
    connection.connect()
    await connection.execute(`SELECT * FROM smash_game.character WHERE discord_tag = \'${tag}\'`, (err, data) => {
        if(err) throw err;
        console.log('Data received from Db:');
        const character = data[0]; 
        return callback(character);
    });
    connection.end();
}

async function getFighter(fighter) {
    console.log(fighter);
}

module.exports.getCharacter = getCharacter; 
module.exports.getFighter = getFighter;

module.exports = { insertCharacter, canLocalStart };
