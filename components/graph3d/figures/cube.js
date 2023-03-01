Figure.prototype.cube = (lenght = 10) => {
	const points = [
		new Point(lenght, lenght, lenght), new Point(lenght, -lenght, lenght),
		new Point(-lenght, lenght, lenght), new Point(lenght, lenght, -lenght),
		new Point(-lenght, lenght, -lenght), new Point(-lenght, -lenght, lenght),
		new Point(-lenght, -lenght, -lenght), new Point(lenght, -lenght, -lenght)
	];

	const edges = [
		new Edge(0, 1), new Edge(0, 2), new Edge(0, 3),
		new Edge(4, 2), new Edge(4, 3),
		new Edge(5, 1), new Edge(5, 2),
		new Edge(6, 5), new Edge(6, 4),
		new Edge(7, 6), new Edge(7, 3), new Edge(7, 1)
	];

	const polygons = [
		new Polygon([3, 0, 1, 7]), new Polygon([6, 5, 2, 4]),
		new Polygon([4, 3, 7, 6]), new Polygon([4, 3, 0, 2]),
		new Polygon([7, 6, 5, 1]), new Polygon([2, 0, 1, 5])
	]

	return new FigureBody(points, edges, polygons, 'cube');
}