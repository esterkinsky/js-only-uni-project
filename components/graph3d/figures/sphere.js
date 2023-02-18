Figure.prototype.sphere = (r, crcs) => {
	const points = [];

	const edges = [];

	return new FigureBody(points, edges, 'sphere');
}

// внешний цикл тау от 0 до пи
// внутр цикл от 0 до 2 пи
// x = r sin tay cos phi ево с y местами поменять
// y = r sin tay cos phi
// z = r cos phi