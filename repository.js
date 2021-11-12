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

// `UPDATE smash_game.character SET experience = experience + 20  WHERE discord_tag = \'${tag}\'` 
// await connection.execute('UPDATE smash_game.`character` SET is_resting = true WHERE discord_id = ?', [interaction.user.tag]);
async function addExperience(tag, exp, fighter) {
    await (await getConnection()).execute(`UPDATE smash_game.character INNER JOIN smash_game.fighter_proficiency ON smash_game.fighter_proficiency.character_id = smash_game.character.character_id SET smash_game.character.experience = smash_game.character.experience + 20, smash_game.fighter_proficiency.experience = smash_game.fighter_proficiency.experience + 20 WHERE smash_game.character discord_tag = 'nastynate#4242' AND smash_game.fighter_proficiency.name = 'LINK'`); 
    console.log('Data received from Db:');
    //console.log(data[0]);
    return data[0]; 
}


/*
function getCharacter(tag, callback) {    
    const [rows] = await (await getConnection()).query(`SELECT * FROM smash_game.character WHERE discord_tag = \'${tag}\'`);
    connection.query(`SELECT * FROM smash_game.character WHERE discord_tag = \'${tag}\'`, (err, data) => {
        if(err) throw err;
        console.log('Data received from Db:');
        const character = data[0]; 
        return callback(character);
    });
    connection.end();
}
*/
/*
async function getFighter(fighter) {
    console.log(fighter);
}
*/ 
//module.exports.getFighter = getFighter;
module.exports = { insertCharacter, canLocalStart, addExperience };
