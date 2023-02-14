class Graph2d {
	constructor() {
		const height = window.innerHeight;
		const width = window.innerWidth;

		this.prop = width / height;
		this.WIN = {
			left: -10 * this.prop,
			bottom: -10,
			width: 20 * this.prop,
			height: 20,
		}

		this.canMove = false;
		this.zoomStep = 1;
		this.funcs = [];
		this.mousePosX = 0;
		this.mousePosY = 0;

		this.canvas = new Canvas({
			id: 'graph',
			WIN: this.WIN,
			width,
			height,
			callbacks: {
				wheel: (event) => this.wheel(event),
				mouseUp: () => this.mouseUp(),
				mouseDown: () => this.mouseDown(),
				mouseMove: (event) => this.mouseMove(event),
				mouseLeave: () => this.mouseLeave(),
			}
		});

		this.ui = new UI({
			changeColor: (num, color) => this.changeColor(num, color),
			changeWidth: (num, width) => this.changeWidth(num, width),
			changeA: (num, value) => this.changeA(num, value),
			changeB: (num, value) => this.changeB(num, value),
			switchIntegralCheckBox: (num) => this.switchIntegralCheckBox(num),
			switchDerivativeCheckBox: (num) => this.switchDerivativeCheckBox(num),
			switchZerosCheckBox: (num) => this.switchZerosCheckBox(num),
			addFunction: (num, f) => this.addFunction(num, f),
			delFunction: (num) => this.delFunction(num),
			createObjectFunc: (num) => this.createObjectFunc(num),
		})

		setInterval(() => {
			this.generate();
			this.funcs.forEach(func => {
				if (func) {
					const { f, color, width, a, b, showDerivative, showIntegral, showZeros } = func;
					if (f) {
						this.printFunction(f, color, width);
						if (showDerivative) {
							this.printDerivative(f, this.mousePosX);
						}
						if ((a || b) && a !== b) {
							if (showIntegral) {
								if (a > b) {
									this.getIntegral(f, b, a);
								} else {
									this.getIntegral(f, a, b);
								}
							}
							if (showZeros) {
								if (a > b) {
									this.canvas.point(this.getZero(f, a, b), 0);
								} else {
									this.canvas.point(this.getZero(f, a, b), 0);
								}
							}
						}
					}
				}
			});
		}, 15)
	}

	printOXY() {
		this.canvas.line(0, this.WIN.bottom, 0, this.WIN.height + this.WIN.bottom, 2, '#787d85')
		this.canvas.line(this.WIN.left, 0, this.WIN.width + this.WIN.left, 0, 2, '#787d85')

		this.canvas.line(this.WIN.width + this.WIN.left, 0, this.WIN.width + this.WIN.left - 0.6, 0.20, 2, '#787d85');
		this.canvas.line(this.WIN.width + this.WIN.left, 0, this.WIN.width + this.WIN.left - 0.6, - 0.20, 2, '#787d85')
		this.canvas.line(0, this.WIN.height + this.WIN.bottom, - 0.20, this.WIN.height + this.WIN.bottom - 0.6, 2, '#787d85')
		this.canvas.line(0, this.WIN.height + this.WIN.bottom, 0.20, this.WIN.height + this.WIN.bottom - 0.6, 2, '#787d85')
	}

	grid() {
		for (var i = 0; i < this.WIN.height + this.WIN.bottom; i++) {
			this.canvas.line(this.WIN.left, i, this.WIN.width + this.WIN.left, i, 1, '#d7d7d7')
			this.canvas.line(0.1, i, -0.1, i, '#A4A4A4')
		}
		for (var i = 0; i > this.WIN.bottom; i--) {
			this.canvas.line(this.WIN.left, i, this.WIN.width + this.WIN.left, i, 1, '#d7d7d7')
			this.canvas.line(0.1, i, -0.1, i, '#787d85')
		}
		for (var i = 0; i < this.WIN.width + this.WIN.left; i++) {
			this.canvas.line(i, this.WIN.bottom, i, this.WIN.height + this.WIN.bottom, 1, '#d7d7d7')
			this.canvas.line(i, 0.1, i, -0.1, '#787d85')
		}
		for (var i = 0; i > this.WIN.left; i--) {
			this.canvas.line(i, this.WIN.bottom, i, this.WIN.height + this.WIN.bottom, 1, '#d7d7d7')
			this.canvas.line(i, 0.1, i, -0.1, 1, '#787d85')
		}
	}

	printNums() {
		const streakLength = this.WIN.height / (this.WIN.width + 30);
		const len = streakLength / 2;
		const shiftY = -this.WIN.height * 0.01 - 0.04;
		const shiftX = this.WIN.width * 0.001 + 0.04;
		for (let i = Math.round(this.WIN.left); i < this.WIN.left + this.WIN.width; i++) {
			this.canvas.printText(i, i + shiftX, shiftY,);
		}
		for (let i = Math.round(this.WIN.bottom); i < this.WIN.bottom + this.WIN.height; i++) {
			this.canvas.printText(i, shiftX, i + shiftY,);
		}
	}

	wheel(event) {
		event.preventDefault()
		const delta = (event.wheelDelta > 0) ? -this.zoomStep : this.zoomStep;
		if (this.WIN.width + delta * this.prop > 0 && this.WIN.height + delta > 0) {
			this.WIN.width += this.prop * delta;
			this.WIN.height += delta;
			this.WIN.left -= this.prop * delta / 2;
			this.WIN.bottom -= delta / 2;
		}
	}

	mouseUp() {
		this.canMove = false;
	}

	mouseDown() {
		this.canMove = true;
	}

	mouseMove(event) {
		if (this.canMove) {
			this.WIN.left -= this.canvas.sx(event.movementX);
			this.WIN.bottom -= this.canvas.sy(event.movementY);
		}
		this.mousePosY = this.WIN.bottom + this.canvas.sy(event.offsetY);
		this.mousePosX = this.WIN.left + this.canvas.sx(event.offsetX);
	}

	mouseLeave() {
		this.canMove = false;
	}

printFunction(f, color = 'black', lineWidth = 2) {
		const { width, left, height } = this.WIN;
		const dx = width / 1000;
		let x = left;

		while (x < width + left) {
			const y1 = f(x);
			const y2 = f(x + dx);
			if (Math.abs(y1 - y2) < height) {
				this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color);
			}
			else {
				this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color, true);
			}

			x += dx;
		}
	}

	getDerivative(f, x0, dx = 0.00001) {
		return (f(x0 + dx) - f(x0)) / dx;
	}

	printDerivative(f, x) {
		const k = this.getDerivative(f, x)
		let b = f(x) - k * x;
		let x1 = this.WIN.left;
		let x2 = this.WIN.left + this.WIN.width;
		let y1 = k * x1 + b;
		let y2 = k * x2 + b;
		this.canvas.line(x1, y1, x2, y2, 1, '#7417b3', true);
	}

	getIntegral(f, a, b, d = 100) {
		const dx = (b - a) / d;
		let x = a;
		const points = [{ x, y: 0, }]
		while (x <= b) {
			points.push({ x, y: f(x) });
			x += dx
		}
		points.push({ x, y: f(x) })
		points.push({ x, y: 0 });
		this.canvas.polygon(points);
	}

	getZero(f, a, b, eps = 0.0001) {
		if (f(a) * f(b) > 0) return null;
		if (f(a) === 0) return a;
		if (f(b) === 0) return b;
		if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;
		const half = (a + b) / 2;
		if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps)
		if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps)
		else return null;
	}

	printZeros = ({ f, color = '#7417b3', x, dx }) => {
		if (f(x) * f(x + dx) <= 0) {
			this.canvas.point({ x: x + dx / 2, y: 0, color })
		}
	}
	
	printRect(event) {
		const x = Math.floor(this.canvas.x(event.offsetX));
		const y = Math.ceil(this.canvas.y(event.offsetY));
		this.canvas.drawRect(x, y, 1, 1, '#dcdcdc');
		const shiftY = this.WIN.height * 0.01;
		const shiftX = this.WIN.width * 0.01 + 0.02;
		const nums = [
			{ x: 0, y: 0, shiftX: -shiftX, shiftY: shiftY },
			{ x: 0, y: -1, shiftX: -shiftX, shiftY: -shiftY },
			{ x: 1, y: 0, shiftX: 0, shiftY: shiftY },
			{ x: 1, y: -1, shiftX: 0, shiftY: -shiftY }
		];
		nums.forEach(coord => {
			this.canvas.printText(`(${coord.x + x}; ${coord.y + y})`, x + coord.x + coord.shiftX, y + coord.y + coord.shiftY,)
		})
	}

	generate() {
		this.canvas.clear()
		this.grid();
		this.printNums();
		this.printOXY();
		/* this.printRect(); */
	}

	changeWidth(num, width) {
		this.funcs[num].width = width;
	}

	changeColor(num, color) {
		this.funcs[num].color = color;
	}

	addFunction(num, f) {
		this.funcs[num].f = f;
	}

	changeA(num, value) {
		this.funcs[num].a = value - 0;
	}

	changeB(num, value) {
		this.funcs[num].b = value - 0;
	}

	switchDerivativeCheckBox(num) {
		this.funcs[num].showDerivative = !this.funcs[num].showDerivative;
	}

	switchIntegralCheckBox(num) {
		this.funcs[num].showIntegral = !this.funcs[num].showIntegral;
	}

	switchZerosCheckBox(num) {
		this.funcs[num].showZeros = !this.funcs[num].showZeros;
	}

	delFunction(num) {
		this.funcs[num] = null;
	}

	createObjectFunc(num) {
		this.funcs[num] = {
			f: null,
			color: 'black',
			width: 2,
			a: 0,
			b: 0,
		}
	}

}