class Polygon {
	constructor(points = [], color = '#f003') {
		this.points = points;
		this.center = new Point;
		this.color = color;
		this.distance = 0;
	}

	/* hexToRgb(hex) {
		const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : { r: 0, g: 0, b: 0 };
	}
	rgbToHex(r, g, b) {
		return `rgb(${r}, ${g}, ${b})`;
	} */
}