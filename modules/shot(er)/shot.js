class Shooter {
	constructor() {
		this.shotToCenter = function (x, y) {
			return (x === 0 && y === 0) ? 10 : 0
		}

		this.shotToCircle = function (x, y) {
			return (x * x + y * y <= 1) ? 2 : 0
		}

		this.shot = function (x, y) {
			if (!document.getElementById('x').value || !document.getElementById('y').value) { return 'Введите значения нормально!' } else
				return this.shotToCenter(x, y) || this.shotToCircle(x, y) || 0
		}

		this.shot2 = function (x, y) {
			return this.shotToCenter(x, y) || this.shotToCircle(x, y) || 0
		}

		this.shoter = function (count, min, max) {
			if (!document.getElementById('count').value || !document.getElementById('min').value || !document.getElementById('max').value) { return 'Введите значения нормально!' } else
				var score = 0
			for (let i = 0; i < count; i++) {
				let x = Math.random() * (max - min) + min;
				let y = Math.random() * (max - min) + min;
				score += this.shot2(x, y)
			}
			return score
		}
	}
}