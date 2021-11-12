const FighterProf = require('./fighter_prof')
const List = require("collections/list");

module.exports = class Character {
    constructor(name, is_pro, fighter, discord_id) {
        this.prize_money = 0
        this.experience = 0
        this.name = name
        this.stamina = 100
        this.is_pro = is_pro
        this.is_resting = false
        this.discord_id = discord_id
        const fighter_prof = new FighterProf(0, fighter);
        this.fighter_pool = new List()
        this.fighter_pool.add(fighter_prof)
        this.character_id = null
    }
}
