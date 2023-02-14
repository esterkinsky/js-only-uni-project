class RPGComponent extends Component {
	constructor(options) {
		super(options)
		this.RPG = new Rpg
		this.start = document.getElementById('startrpg')
		this.start.addEventListener('click', this.RPG.rpg)
	}
}

