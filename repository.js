const Character = require('./character.js')
const mysql      = require('mysql2');

module.exports = async function insertCharacter(character) {
    let connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        database : 'smash_game'
    });
    
    const string = `insert into character(prize_money, experience, name, stamina, is_pro) values(${character.prize_money}, ${character.experience}, ${character.name}, ${character.stamina}, ${character.is_pro})`;
    console.log(string); 

    connection.connect();
    let char_id
    await connection.promise().query(`insert into smash_game.\`character\`(prize_money, experience, name, stamina, is_pro) values(${character.prize_money}, ${character.experience}, '${character.name}', ${character.stamina}, ${character.is_pro})`, function (error, results, fields) {
        if (error) throw error;
        char_id = results.insertId;
    });
    const fighter_prof = character.fighter_pool.peek(); 
    await connection.promise().query(`insert into smash_game.\`fighter_proficiency\`(character_id, experience, name) values(${char_id}, ${fighter_prof.experience}, '${fighter_prof.name}')`, function (error, results, fields) {
        if (error) throw error;
    });

    connection.end();
}
 