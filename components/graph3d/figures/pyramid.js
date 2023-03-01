Figure.prototype.pyramid = (count = 6) => {
    const edges = [];
    const points = [new Point(0, 10, 0)];
	const polygons = [];
	const basePolygons = [];
	
    const y = -10;
    const delta = (2 * Math.PI) / count;
    for(let i = 0; i < 2 * Math.PI; i += delta) {
        points.push(new Point(
            10 * Math.cos(i),
            y,
            10 * Math.sin(i)
        ));
    }

    for(let i = 0; i < points.length; i++) {
        if(points[i + 1]) {
            edges.push(new Edge(0, i + 1))
            edges.push(new Edge(i, i + 1))
            edges.push(new Edge(points.length - 1, 1))
        }
    }

	for (let i = 0; i < points.length; i++) {
		if (points[i + 1]) {
			polygons.push(new Polygon([0, i, i + 1]));
		}
	}
	for (let i = 1; i <= count; i++) { basePolygons.push(i) }
	polygons.push(new Polygon(basePolygons));


	return new FigureBody(points, edges, polygons, 'pyramid');
}