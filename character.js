const FighterProf = require('./fighter_prof')
const List = require("collections/list");

module.exports = class Character {
    constructor(name, is_pro, fighter) {
        this.prize_money = 0
        this.experience = 0
        this.name = name
        this.stamina = 100
        this.is_pro = is_pro
        this.fighter_pool = new List(new FighterProf(0, fighter))
    }
}