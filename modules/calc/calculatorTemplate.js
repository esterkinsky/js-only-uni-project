Template.prototype.calculatorTemplate = () =>
	`<div class="calcsContainer">
			<section>
				<div class="containerC">
					<textarea placeholder="0" class="number" id="firstNumber"></textarea>
					<textarea placeholder="0" class="number" id="secondNumber"></textarea>
					<textarea class="resultNumber" id="resultNumber"></textarea>
					<div class="buttons">
						<button id="clear" class="button">C</button>
						<button class="operands" data-operand="zero"> zero </button>
						<button class="operands" data-operand="one"> one </button>
						<button class="operands" data-operand="add"> + </button>
						<button class="operands" data-operand="sub"> - </button>
						<button class="operands" data-operand="mult"> * </button>
						<button class="operands" data-operand="divide"> / </button>
						<button class="operands" data-operand="pow">x^y</button>
					</div>
				</div>
			</section>
	</div>`