class Human {
	constructor(stamina = 1000, health = 1000, iq = 1000, happy = 1000) {
		this.stamina = stamina
		this.health = health
		this.iq = iq
		this.happy = happy
	}
	toSleep() {
		this.stamina = this.stamina + 500
		this.happy = this.happy + 50
		this.iq = this.iq - 50
	}
	toEat() {
		this.health = this.health + 200
		this.happy = this.happy + 50
		this.stamina = this.stamina - 100
		this.iq = this.iq - 50
	}
	toPlay() {
		this.health = this.health - 250
		this.happy = this.happy + 200
		this.iq = this.iq - 200
		this.stamina = this.stamina - 200
	}
	toThink() {
		this.iq = this.iq + 300
		this.stamina = this.stamina - 200
		this.happy = this.happy - 300
		this.health = this.health - 100
	}
}