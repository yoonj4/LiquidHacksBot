const Character = require('./character.js')

modules.export = function(character1, character2){
    // get all necessary data to calculate smash level
    // get fighter proficiencies
    let fighterLv1 = fighter1.calculateFighterLv();
    let fighterLv2 = fighter2.calculateFighterLv();

    // get player levels
    let characterLv1 = player1.calculateCharacterLv();
    let characterLv2 = player2.calculateCharacterLv();

    // calculate smash level
    let smashLv1 = calculateSmashLv();
    let smashLv2 = calculateSmashLv();

    // calculate each player's odds of winning
    let character1Odds = (smashLv1 / (smashLv1 + smashLv2)) * 100
    let character2Odds = (smashLv2 / (smashLv1 + smashLv2)) * 100

    // Get a random number between 0 and 100
    let roll = Math.round(Math.random() * 100);
    let winner = "";

    // determine winner
    if (character1Odds > character2Odds) {
        character1Odds = Math.ceiling(character1Odds);
        character2Odds = Math.floor(character2Odds);
        if (roll > 0 && roll < character1Odds) {
            winner = character1.name;
        } else {
            winner = character2.name;
        }
    } else {
        character1Odds = Math.floor(character1Odds);
        character2Odds = Math.ceiling(character2Odds);
        if (roll > 0 && roll < character2Odds) {
            winner = character2.name;
        } else {
            winner = character1.name
        }
    }

    return winner; //return an array [Character object, "fighter_name"]
}

function calculateSmashLv(characterLv, fighterLv) {
    return playerLv + fighterLv;
}
