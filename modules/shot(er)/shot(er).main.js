class ShootShooter extends Component {
	constructor(options) {
		super(options)
		this.shotButton = document.getElementById('shot')
		this.shotButton.addEventListener('click', () => this.shotHandler())

		this.shoterButton = document.getElementById('shoter')
		this.shoterButton.addEventListener('click', () => this.shoterHandler())

	}

	shotHandler() {
		const shot = new Shooter
		var x = document.getElementById('x').value - 0
		var y = document.getElementById('y').value - 0
		document.getElementById('shotResult').innerHTML = 'Результат: ' + shot.shot(x, y)
	}

	shoterHandler() {
		const shot = new Shooter
		var count = document.getElementById('count').value - 0
		var min = document.getElementById('min').value - 0
		var max = document.getElementById('max').value - 0
		document.getElementById('shoterResult').innerHTML = 'Результат: ' + shot.shoter(count, min, max)
	}
}

