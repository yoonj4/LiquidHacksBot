const FighterProf = require('./fighter_prof')
const List = require("collections/list");

class Character {
    constructor(name, is_pro, fighter, discord_tag) {
        this.prize_money = 0
        this.experience = 0
        this.name = name
        this.stamina = 100
        this.is_pro = is_pro
        this.is_resting = false
        this.discord_tag = discord_tag
        const fighter_prof = new FighterProf(0, fighter);
        this.fighter_pool = new List()
        this.fighter_pool.add(fighter_prof)
    }

    calculateCharacterLv() {
        return Math.ceil(this.experience / 100);
    }

}


function fromDb(rows) {
    const first = rows[0];
    const c = new Character(first.character_name, first.is_pro, first.name, first.discord_tag);
    c.prize_money = first.prize_money;
    c.experience = first.character_experience;
    c.stamina = first.stamina;
    c.is_resting = first.is_resting;
    c.fighter_pool = new List();
    for (const row of rows) {
        const fighter = new FighterProf(row.experience, row.name);
        c.fighter_pool.add(fighter);
    }

    return c;
}
module.exports = {Character, fromDb};
