const { canLocalStart } = require('./repository.js');

async function startTournament() {
    if (await canLocalStart()) {
        const channels = client.channels;
        return;
    }
}

module.exports = { startTournament };