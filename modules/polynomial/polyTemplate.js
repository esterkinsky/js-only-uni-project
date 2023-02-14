Template.prototype.polyTemplate = () =>
	`<div class="calcsContainer">
	    <section>
	        <div class="containerC">
                <textarea class="polyInputA" placeholder="Полином"></textarea>
                <textarea class="polyInputB" placeholder="Полином"></textarea>
                <textarea class="polyInputX" placeholder="x"></textarea>
                <div class="resultContainer">
                    <textarea class="newPoly" placeholder= "Result" ></textarea>
                </div>
                <div class="resultContainer">
                    <textarea class="polyResult"></textarea>
		        </div>
                <div class="buttons">
                    <button class="polyOperand" data-operand="add">+</button>
                    <button class="polyOperand" data-operand="sub">-</button>
                    <button class="polyOperand" data-operand="mult">*</button>
                    <button class="resultButton">=</button>
                </div>
            </div>
        </section>
	</div>`