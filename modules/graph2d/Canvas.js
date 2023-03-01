class Canvas {
	constructor({ WIN, id, width = 700, height = 700, callbacks = {}, color }) {
		this.WIN = WIN;
		this.canvas = document.getElementById(id);
		this.canvas.width = width;
		this.canvas.height = height
		this.context = this.canvas.getContext(`2d`);

		this.canvas.color = color;

		const { wheel, mouseUp, mouseDown, mouseMove, mouseLeave } = callbacks;
		this.canvas.addEventListener('wheel', wheel);
		this.canvas.addEventListener('mousedown', mouseDown);
		this.canvas.addEventListener('mouseup', mouseUp);
		this.canvas.addEventListener('mousemove', mouseMove);
		this.canvas.addEventListener('mouseleave', mouseLeave);
	};

	xs = (x) => (x - this.WIN.LEFT) / this.WIN.WIDTH * this.canvas.width;
	ys = (y) => this.canvas.height - (y - this.WIN.BOTTOM) / this.WIN.HEIGHT * this.canvas.height;

	sx = (x) => x * this.WIN.WIDTH / this.canvas.width;
	sy = (y) => -y * this.WIN.HEIGHT / this.canvas.height;

	x = (xs) => xs * this.WIN.WIDTH / this.canvas.width + this.WIN.left;
	y = (ys) => -ys * this.WIN.HEIGHT / this.canvas.height + this.WIN.BOTTOM + this.WIN.HEIGHT;

	drawRect(x, y, width, height, color = '#ebebeb') {
		const heightRect = height * this.canvas.height / this.WIN.HEIGHT;
		const widthRect = width * this.canvas.width / this.WIN.WIDTH;
		this.context.fillStyle = color;
		this.context.fillRect(this.xs(x), this.ys(y), widthRect, heightRect);
	};

	clear() {
		this.context.fillStyle = '#ebebeb';
		this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	};

	line(x1, y1, x2, y2, width = 1, color = '#787d85', isDash = false) {
		this.context.beginPath();
		this.context.strokeStyle = color;
		this.context.moveTo(this.xs(x1), this.ys(y1));
		if (isDash) {
			this.context.lineWidth = 1;
			this.context.setLineDash([10, 10]);
		} else {
			this.context.lineWidth = width;
			this.context.setLineDash([]);
		}
		this.context.lineTo(this.xs(x2), this.ys(y2));
		this.context.stroke();
		this.context.closePath();
	};

	printText(text, x, y, color = '#A4A4A4', size = NaN) {
		this.context.font = `${size}px serif`;
		this.context.fillStyle = color;
		this.context.fillText(text, this.xs(x), this.ys(y));
	};

	point(x, y, color = 'black', size = 4) {
		this.context.beginPath();
		this.context.arc(this.xs(x), this.ys(y), size, 0, 2 * Math.PI);
		this.context.fillStyle = color;
		this.context.fill();
		this.context.closePath();
	};

	polygon(points = [], color = 'pink') {
		if (points.length >= 3) {
			this.context.fillStyle = color;
			this.context.strokeStyle = color;
			this.context.beginPath();
			this.context.moveTo(this.xs(points[0].x), this.ys(points[0].y));
			for (let i = 1; i < points.length; i++) {
				this.context.lineTo(this.xs(points[i].x), this.ys(points[i].y));
			}
			this.context.lineTo(this.xs(points[0].x), this.ys(points[0].y));
			this.context.closePath();
			this.context.fill();
			this.context.stroke();
		};
	};

};