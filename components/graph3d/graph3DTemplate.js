Template.prototype.Graph3D = () => `
    <div class="graph3D">
        <div class ="canvas3D">
            <canvas id="canvas3D"></canvas>
        </div>
        <div class="figures">
            <div class="addDelFigureBlock">
                <button id="addFigure" class="countOfFigures">Add Figure</button>
                <button id="deleteFigure" class="countOfFigures">Delete Figure</button>
            </div>
            <div class="figureSelector">
                <select id="figures">
                    <option class ="option">cube</option>
                </select>
            </div>
        </div>
    </div>
`;