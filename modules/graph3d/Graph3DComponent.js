class Graph3DComponent extends Component {
	constructor(options) {
		super(options)

		const height = window.innerHeight;
		const width = window.innerWidth;

		this.prop = width / height;

		this.WIN = {
			LEFT: -10 * this.prop,
			BOTTOM: -10,
			WIDTH: 20 * this.prop,
			HEIGHT: 20,
			CAMERA: new Point(0, 0, 50),
			DISPLAY: new Point(0, 0, 30)
		}

		this.canvas = new Canvas({
			id: 'canvas3D',
			WIN: this.WIN,
			width,
			height,
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


		this.isPointsAllow = true;
		this.isEdgesAllow = true;
		this.isPolygonsAllow = true;
		this.figureNumber = 0;
		this.canMove = false;
		this.figures = [(new Figure).sphere(10, 20, 0, 0, 0)];
		this.dx = 0;
		this.dy = 0;
		this.renderScene();

		const arrow = document.querySelector('.menuGraphButton2');
		arrow.addEventListener('click', () => {
			arrow.classList.toggle('down')

			var div = document.querySelector('.container3')
			div.style.transform = div.style.transform === 'translateX(-100%)' ? 'translateX(0%)' : 'translateX(-100%)'
		});

	/* 	document.getElementById('colorSelector').addEventListener('input', () => this.selectColor()); */
		document.getElementById('isPolygons').addEventListener('click', () => this.check('isPolygonsAllow'));
		document.getElementById('figures').addEventListener('change', () => this.selectFigure());
		document.getElementById('isPoints').addEventListener('click', () => this.check('isPointsAllow'));
		document.getElementById('isEdges').addEventListener('click', () => this.check('isEdgesAllow'));
	}

	/* selectColor() {
		this.figures.forEach(figure => {
			figure.polygons.forEach(polygon => {
				polygon.color = polygon.hexToRgb(document.getElementById('colorSelector').value);
			});
		});
		this.renderScene();
	} */

	selectFigure() {
		const selectBox = document.getElementById('figures');
		this.figures[this.figureNumber] = (new Figure)[selectBox.options[selectBox.selectedIndex].text]();
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
		this.figures[this.figureNumber].points.forEach(point => {
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

	check(name) {
		this[name] = !this[name];
		this.renderScene();
	}

	renderScene() {
		this.canvas.clear();

		if (this.isPolygonsAllow) {
			this.figures.forEach(figure => {
				this.graph3D.calcCenters(figure);
				this.graph3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
				this.graph3D.sortByArtistAlgorithm(figure.polygons);
				figure.polygons.forEach(polygon => {
					const points = [figure.points[polygon.points[0]],
					figure.points[polygon.points[1]],
					figure.points[polygon.points[2]],
					figure.points[polygon.points[3]]
					];
					this.canvas.polygon(points.map(point => {
						return {
							x: this.graph3D.xs(point),
							y: this.graph3D.ys(point)
						}
					}), polygon.color
					);
				});
			});
		}

		if (this.isEdgesAllow) {
			this.figures.forEach(figure => {
				figure.edges.forEach(edge => {
					const point1 = figure.points[edge.p1];
					const point2 = figure.points[edge.p2];
					this.canvas.line(
						this.graph3D.xs(point1),
						this.graph3D.ys(point1),
						this.graph3D.xs(point2),
						this.graph3D.ys(point2),
						2, 'black'
					);
				});
			});
		}

		if (this.isPointsAllow) {
			this.figures.forEach(figure => {
				figure.points.forEach(point => {
					this.canvas.point(this.graph3D.xs(point), this.graph3D.ys(point), 'black');
				});
				;
			})
		}
	}
}
