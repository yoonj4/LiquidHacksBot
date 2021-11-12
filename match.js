const Character = require('./character.js');
const FighterProf = require('./fighter_prof.js');

 modules.export = function(char1, char2, fighter1, fighter2){
    // calculate smash level
    let smashLv1 = calculateSmashLv(char1.calculateCharacterLv(), fighter1.calculateFighterLv(), char1.stamina);
    let smashLv2 = calculateSmashLv(char2.calculateCharacterLv(), fighter2.calculateFighterLv(), char2.stamina);

    // calculate each player's odds of winning
    let char1Odds = (smashLv1 / (smashLv1 + smashLv2)) * 100

    // Get a random number between 0 and 100
    let roll = Math.random() * 100;

    // determine winner
    if (roll <= char1Odds) {
        return char1
    } else {
        return char2
    }
 }

function calculateSmashLv(characterLv, fighterLv, stamina) {
    return (characterLv + fighterLv) * (.5 * (stamina / 100) + .5);
}
