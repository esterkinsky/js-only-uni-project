Figure.prototype.sphere = (r = 10, crcs = 20, x = 0, y = 0, z = 0, color) => {
	const points = [];
	const edges = [];
	const polygons = [];

	const deltaT = Math.PI / crcs;
	const deltaF = 2 * Math.PI / crcs;

	for (let i = 0; i < Math.PI; i += deltaT) {
		for (let j = 0; j < 2 * Math.PI; j += deltaF) {
			points.push(new Point(
				r * Math.sin(i) * Math.sin(j) + x,
				r * Math.cos(i) + y,
				r * Math.sin(i) * Math.cos(j) + z
			));
		}
	}

	for (let i = 0; i < points.length; i++) {
		if (points[i + 1]) {
			if ((i + 1) % crcs === 0) {
				edges.push(new Edge(i, i + 1 - crcs));
			} else {
				edges.push(new Edge(i, i + 1));
			}
		}
		if (points[i + crcs]) {
			edges.push(new Edge(i, i + crcs));
		}
	}
	edges.push(new Edge(points.length - crcs, points.length - 1));

	for (let i = 0; i < points.length; i++) {
		if (points[i + crcs + 1]) {
			if ((i + 1) % crcs === 0) {
				polygons.push(new Polygon([i, i - crcs + 1, i + 1, i + crcs], color));
			} else
				polygons.push(new Polygon([i, i + 1, i + crcs + 1, i + crcs], color));
		}
	}
	polygons.push(new Polygon([points.length - 1, points.length - crcs - 1, points.length - 2 * crcs, points.length - crcs], color));

	return new FigureBody(points, edges, polygons, 'sphere');
}