class Graph3D {
    constructor({WIN}) {
        this.WIN = WIN;
    }

    xs(point) {
        return point.x * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }
    ys(point) {
        return point.y * (this.WIN.CAMERA.z - this.WIN.DISPLAY.z) / (this.WIN.CAMERA.z - point.z);
    }

    multMatrix(T = [], m = []) {
        const matrString = [0, 0, 0, 0]
        for(let j = 0; j < T.length; j++) {
            for(let i = 0; i < T[j].length; i++) {
                matrString[j] += T[j][i] * m[i];
            }
        }
        return matrString;
    }

    transform(matrix, point) {
        const array = this.multMatrix(
            matrix,
            [point.x, point.y, point.z, 1]
        );
        point.x = array[0];
        point.y = array[1];
        point.z = array[2];
    }
    
    zoom(delta) {
        return [
            [delta, 0, 0, 0],
            [0, delta, 0, 0],
            [0, 0, delta, 0],
            [0, 0, 0, 1]
        ];
    }

    move(dx, dy, dz) {
        return [
            [1, 0, 0, dx],
            [0, 1, 0, dy],
            [0, 0, 1, dz],
            [0, 0, 0, 1]
        ];
    }
}