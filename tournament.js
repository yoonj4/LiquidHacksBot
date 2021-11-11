const { canLocalStart } = require('./repository.js');

async function startTournament() {
    const a = await canLocalStart();
    console.log(a);
}

module.exports = { startTournament };