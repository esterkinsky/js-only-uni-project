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

	return new FigureBody(points, edges, 'cube');
}