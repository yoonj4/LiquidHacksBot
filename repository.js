const Character = require('./character.js')
const mysql = require('mysql2/promise');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'smash_game'
});

<<<<<<< HEAD
async function insertCharacter(character) {
    const [rows] = await getConnection().execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro) values(?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro]);
=======
async function insertCharacter(character, guildId) {
    const [rows] = await (await connection).execute('insert into smash_game.character(prize_money, experience, name, stamina, is_pro, discord_tag, guild_id) values(?, ?, ?, ?, ?, ?, ?)', [character.prize_money, character.experience, character.name, character.stamina, character.is_pro, character.character_tag, guildId]);
>>>>>>> 10efca0851f9c70ffdefdc3686e4a809cde9e6c2
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
<<<<<<< HEAD
    const [rows] = await getConnection().execute('select count(*) as num_players from smash_game.character');
=======
    const [rows] = await (await connection).execute('select count(*) as num_players from smash_game.character');
>>>>>>> 10efca0851f9c70ffdefdc3686e4a809cde9e6c2
    return rows[0].num_players > 1;
}

async function rest(username, restTimer) {
    await (await connection).execute('UPDATE smash_game.`character` SET is_resting = true WHERE discord_tag = ?', [username]);
    await (await connection).execute('UPDATE smash_game.`character` SET stamina = 100 WHERE discord_tag = ?', [username]);
    await new Promise(r => setTimeout(r, restTimer));
    (await connection).execute('UPDATE smash_game.`character` SET is_resting = false WHERE discord_tag = ?', [username]);
}

<<<<<<< HEAD
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
=======
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
>>>>>>> 10efca0851f9c70ffdefdc3686e4a809cde9e6c2
