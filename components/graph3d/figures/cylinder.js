Figure.prototype.cylinder = (R = 10, count = 10, axes = 3) => {
    const edges = [];
    const points = [];

    const z = 10;
    const deltaZ = z / axes;
    const deltaT = (2 * Math.PI) / count;

    for(let j = z; j > 0; j -= deltaZ) {
        for(let i = 0; i < 2 * Math.PI; i += deltaT) {
            let x = R * Math.cos(i);
            let y = R * Math.sin(i);
    
            points.push(new Point(x, y, j));
        }
    }

    for(let i = 0; i < points.length - 1; i++) {
        edges.push(new Edge(i, i + 1))
    }


	return new FigureBody(points, edges);
}