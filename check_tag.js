const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'smash_game'
});

function checkDiscordTag(tag, callback) {
    connection.query(`SELECT * FROM smash_game.character WHERE discord_tag = \'${tag}\'`, (err, data) => {
        if(err) throw err;
        // iterates through data and checks if tag exists
        if(data.length === 0) {
            return callback(false);
        } else {
            for(let i = 0; i < data.length; i++) {
                if(data[i].discord_tag === tag) {
                    return callback(data[i]); 
                } 
            }
        }
        connection.end();
    }
)}

module.exports.checkDiscordTag = checkDiscordTag;