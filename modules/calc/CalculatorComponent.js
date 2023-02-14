class CalculatorComponent extends Component {
	constructor(options) {
		super(options)
		this.calculator = new Calculator();

		const buttons = document.querySelectorAll('.operands');
		buttons.forEach(button => {
			button.addEventListener('click', () => this.makeCalculate(button.dataset.operand));
		});

	 	const clearButton = document.getElementById('clear')
		clearButton.addEventListener('click', () => this.clear()) 

	}

	clear() {
		document.getElementById('firstNumber').value = ''
		document.getElementById('secondNumber').value = ''
		document.getElementById('resultNumber').value = ''
	} 

	makeCalculate(operand) {
		const textA = document.getElementById('firstNumber');
		const textB = document.getElementById('secondNumber');
		const textC = document.getElementById('resultNumber');

		let a = this.calculator.getEntity(textA.value);
		let b = this.calculator.getEntity(textB.value);

		if (a && b) {
			return textC.value = this.calculator[operand](a, b).toString();
		}
		if (a) {
			return textC.value = this.calculator[operand](a).toString();
		}
		if (b) {
			return textC.value = this.calculator[operand](b).toString();
		}
		else document.getElementById('resultNumber').value = 'введите значения в поля'
	}

}