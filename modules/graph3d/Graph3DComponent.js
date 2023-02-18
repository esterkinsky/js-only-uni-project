class Graph3DComponent extends Component {
	constructor(options) {
		super(options)

		this.WIN = {
			LEFT: -10,
			BOTTOM: -10,
			WIDTH: 20,
			HEIGHT: 20,
			CAMERA: new Point(0, 0, 50),
			DISPLAY: new Point(0, 0, 30)
		}

		this.canvas = new Canvas({
			id: 'canvas3D',
			WIN: this.WIN,
			width: 500,
			height: 500,
			callbacks: {
				wheel: event => this.wheel(event),
				mouseMove: event => this.mouseMove(event),
				mouseDown: event => this.mouseDown(event),
				mouseUp: () => this.mouseUp(),
				mouseLeave: () => this.mouseLeave()
			}
		});

		this.graph3D = new Graph3D({
			WIN: this.WIN
		});

		this.canMove = false;
		this.figures = [(new Figure).cube(7)];
		this.dx = 0;
		this.dy = 0;
		this.renderScene();
	}

	_addEventListeners() {
	}

	selectFigure() {
		this.renderScene();
	}

	wheel(event) {
		event.preventDefault();
		const delta = (event.wheelDeltaY > 0) ? 1.1 : 0.9;
		const matrix = this.graph3D.zoom(delta);
		this.figures.forEach(figure => {
			figure.points.forEach(point => {
				this.graph3D.transform(matrix, point)
			});
		});
		this.renderScene();
	}

	moveFigures(dx, dy, dz) {
		const matrix = this.graph3D.move(dx, dy, dz);
		this.figures.points.forEach(point => {
			this.graph3D.transform(matrix, point);
		});
		this.renderScene();
	}

	mouseMove(event) {
		if (this.canMove) {
			const gradus = Math.PI / 180;
			const matrixY = this.graph3D.rotateOy((this.dy - event.offsetY) * gradus);
			const matrixX = this.graph3D.rotateOx((this.dx - event.offsetX) * gradus);
			this.figures.forEach(figure => {
				figure.points.forEach(point => {
					this.graph3D.transform(matrixY, point);
					this.graph3D.transform(matrixX, point);
				});
			});
			this.dx = event.offsetX;
			this.dy = event.offsetY;
			this.renderScene();
		}
	}

	mouseDown(event) {
		this.canMove = true;
		this.dx = event.offsetX
		this.dy = event.offsetY
	}

	mouseLeave() {
		this.canMove = false;
	}

	mouseUp() {
		this.canMove = false;
	}

	renderScene() {
		this.canvas.clear();
		this.figures.forEach(figure => {
			figure.edges.forEach(edge => {
				const point1 = figure.points[edge.p1];
				const point2 = figure.points[edge.p2];
				this.canvas.printLine(
					this.graph3D.xs(point1),
					this.graph3D.ys(point1),
					this.graph3D.xs(point2),
					this.graph3D.ys(point2),
					'black', 1
				);
			});
			figure.points.forEach(point => {
				this.canvas.printPoint(this.graph3D.xs(point), this.graph3D.ys(point));
			});
		});
	}
}