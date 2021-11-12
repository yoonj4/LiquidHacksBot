module.exports = class FighterProf {
    constructor(experience, name) {
        this.experience = experience
        this.name = name
    }

    calculateFighterLv() {
        return Math.ceil(this.experience / 100);
    }
}
