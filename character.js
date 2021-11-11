const FighterProf = require('./fighter_prof')
const List = require("collections/list");

module.exports = class Character {
    constructor(discord_tag, name, is_pro, fighter) {
        this.discord_tag = discord_tag
        this.prize_money = 0
        this.experience = 0
        this.name = name
        this.stamina = 100
        this.is_pro = is_pro
        const fighter_prof = new FighterProf(0, fighter);
        this.fighter_pool = new List()
        this.fighter_pool.add(fighter_prof)
    }
}