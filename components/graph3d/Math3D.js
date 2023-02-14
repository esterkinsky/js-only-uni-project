class Math3D {
	constructor({WIN, canvas}) {
        this.WIN = WIN;
        this.canvas = canvas;
    }
	xs(point) {
		const { CAMERA, FOCUS } = this.WIN;
		return point.x * (CAMERA.z - FOCUS.z) / (CAMERA.z - point.z);
	}

	ys(point) {
		const { CAMERA, FOCUS } = this.WIN;
		return point.y * (CAMERA.z - FOCUS.z) / (CAMERA.z - point.z);
	}
}