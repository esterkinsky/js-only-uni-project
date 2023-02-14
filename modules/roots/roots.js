class Roots {
	constructor() {
		this.line = function (a, b) {
			if (a === 0 && b === 0) {
				return ['Корни: все действительные числа (R)']
			}
			if (a === 0) {
				return ['Нет корней']
			}
			return [-b / a]
		}

		this.square = function (a, b, c) {
			var D = b * b - 4 * a * c
			if (D < 0) {
				return ['Корней нет!']
			}
			if (D === 0) {
				return [-b / (2 * a)]
			}
			return [
				(-b + Math.sqrt(D)) / (2 * a),
				(-b - Math.sqrt(D)) / (2 * a)
			]
		}
		this.cube = function (x) {
			var y = Math.pow(Math.abs(x), 1 / 3)
			return x < 0 ? -y : y
		}

		this.square3 = function (a, b, c, d) {
			if (Math.abs(a) < 1e-8) {
				a = b; b = c; c = d;
				if (Math.abs(a) < 1e-8) {
					a = b; b = c;
					if (Math.abs(a) < 1e-8) // вырожденный ивент
						return []
					return [-b / a]
				}

				let D = b * b - 4 * a * c
				if (Math.abs(D) < 1e-8)
					return [-b / (2 * a)]
				else if (D > 0)
					return [(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)]
				return []
			}

			// чейнж ту вырожденный ивент t^3+pt+q = 0 //subst x = t - b/3a
			let p = (3 * a * c - b * b) / (3 * a * a)
			let q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a)
			let roots

			if (Math.abs(p) < 1e-8) { // p = 0 -> t^3 = -q -> t = -q^1/3
				roots = [this.cube(-q)]
			} else if (Math.abs(q) < 1e-8) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
				roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : [])
			} else {
				let D = q * q / 4 + p * p * p / 27
				if (Math.abs(D) < 1e-8) {
					roots = [-1.5 * q / p, 3 * q / p]
				} else if (D > 0) {
					let u = this.cube(-q / 2 - Math.sqrt(D))
					roots = [u - p / (3 * u)]
				} else {
					let u = 2 * Math.sqrt(-p / 3)
					let t = Math.acos(3 * q / p / u) / 3
					let k = 2 * Math.PI / 3
					roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)]
				}
			}

			for (let i = 0; i < roots.length; i++)
				roots[i] -= b / (3 * a)

			return roots
		}

		this.getRoots = function (a, b, c, d) {
			if (!isNaN(a) && !isNaN(b) && !isNaN(c) && !isNaN(d)) {
				return this.square3(a, b, c, d)
			}
			if (!isNaN(a) && !isNaN(b) && !isNaN(c)) {
				return this.square(a, b, c)
			}
			if (!isNaN(a) && !isNaN(b)) {
				return this.line(a, b)
			}
			return null
		}
	}
}