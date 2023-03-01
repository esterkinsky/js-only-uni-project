Template.prototype.Graph3D = () => `
	<div class="menuGraphButton2"></div>
    <div class="graph3D">
        <div class ="canvas3D">
            <canvas id="canvas3D"></canvas>
        </div>
    </div>
	
	<div class="container3" style="transform: translateX(-100%)">
       <div class="figures">
            <div class="figureSelector">
                <select id="figures">
                    <option class ="option">cube</option>
                    <option class ="option" selected="selected">sphere</option>
					<option class ="option">pyramid</option>
                </select>
            </div>
			<div class="colorSelector">
                <input id="colorSelector" type="color" value="#f003">
            </div>
        </div>
		 <div class="allows">
                <label>
                    <input type="checkbox" id="isPoints" class="Options3D" checked>
                    <span class="checkingButtonStyle">Points</span>
                </label>
                <label>
                    <input type="checkbox" id="isEdges" class="Options3D" checked>
                    <span class="checkingButtonStyle">Edges</span>
                </label>
				<label>
                    <input type="checkbox" id="isPolygons" class="Options3D" checked>
                    <span class="checkingButtonStyle">Polygons</span>
                </label>
            </div>
    </div>

`;