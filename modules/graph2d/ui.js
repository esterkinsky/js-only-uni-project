class UI {
	constructor({
		changeColor,
		changeWidth,
		changeA,
		changeB,
		switchDerivativeCheckBox,
		switchIntegralCheckBox,
		switchZerosCheckBox,
		addFunction,
		delFunction,
		createObjectFunc
	}) {
		this.addFunction = addFunction;
		this.delFunction = delFunction;
		this.changeWidth = changeWidth;
		this.changeColor = changeColor;
		this.changeA = changeA;
		this.changeB = changeB;
		this.switchDerivativeCheckBox = switchDerivativeCheckBox;
		this.switchIntegralCheckBox = switchIntegralCheckBox;
		this.switchZerosCheckBox = switchZerosCheckBox;
		this.createObjectFunc = createObjectFunc;

		this.num = 0;
		document.querySelector('.addFunction').addEventListener('click', () => this.addFunctionHandler());

		const arrow = document.querySelector('.menuGraphButton');
		arrow.addEventListener('click', () => {
			arrow.classList.toggle('down')

			var div = document.querySelector('.container2')
			div.style.transform = div.style.transform === 'translateX(-100%)' ? 'translateX(0%)' : 'translateX(-100%)'
		});
	}

	addFunctionHandler() {

		const inputFunc = this.createInput(this.keyUpFunctionHandler, 'f(x)', 'inputFunc');
		const inputWidth = this.createInput(this.keyUpWidthHandler, 'Width', 'inputWidth', 'number');
		const inputColor = this.createInput(this.keyUpColorHandler, 'Color', 'inputColor', 'color');
		const inputA = this.createInput(this.keyUpAHandler, 'a', 'inputA', 'number');
		const inputB = this.createInput(this.keyUpBHandler, 'b', 'inputB', 'number');

		const button = document.createElement('button');
		button.innerHTML = '&#10006';
		button.dataset.num = this.num;
		button.addEventListener('click', () => {
			div.removeChild(funcBlock);
			this.delFunction(button.dataset.num);
		})
		button.className = 'deleteFunc';

		const checkDerivative = document.createElement('div');
		checkDerivative.dataset.num = this.num;
		checkDerivative.className = 'switch-btn';
		checkDerivative.addEventListener('click', (event) => this.switchDerivativeHandler(event))

		const checkIntegral = document.createElement('div');
		checkIntegral.dataset.num = this.num;
		checkIntegral.className = 'switch-btn';
		checkIntegral.addEventListener('click', (event) => this.switchIntegralHandler(event))

		const checkZeros = document.createElement('div');
		checkZeros.dataset.num = this.num;
		checkZeros.className = 'switch-btn';
		checkZeros.addEventListener('click', (event) => this.switchZerosHandler(event))

		const funcBlock = document.createElement('div');
		funcBlock.className = 'funcBlock';

		funcBlock.appendChild(inputFunc);
		funcBlock.appendChild(inputWidth);
		funcBlock.appendChild(inputA);
		funcBlock.appendChild(inputB);
		funcBlock.appendChild(inputColor);
		funcBlock.appendChild(checkZeros);
		funcBlock.appendChild(checkDerivative);
		funcBlock.appendChild(checkIntegral);
		funcBlock.appendChild(button);

		const div = document.querySelector('.funcs-сontainer');

		div.appendChild(funcBlock);

		this.createObjectFunc(this.num);
		this.num++;
	}

	createInput(handler, placeholder, className, type = 'text') {
		const input = document.createElement('input');
		input.dataset.num = this.num;
		input.addEventListener('input', (event) => handler(event));
		input.setAttribute('placeholder', placeholder);
		input.setAttribute('type', type);
		input.className = className;
		return input;
	}

	keyUpFunctionHandler = (event) => {
		try {
			let f;
			eval(`f = function(x) {return ${event.target.value};}`);
			this.addFunction(event.target.dataset.num, f);
		} catch (e) {
			console.log(e);
		}
	}

	keyUpWidthHandler = (event) => {
		this.changeWidth(event.target.dataset.num, event.target.value);
	}

	keyUpColorHandler = (event) => {
		this.changeColor(event.target.dataset.num, event.target.value);
	}

	keyUpAHandler = (event) => {
		this.changeA(event.target.dataset.num, event.target.value);
	}

	keyUpBHandler = (event) => {
		this.changeB(event.target.dataset.num, event.target.value);
	}

	switchDerivativeHandler(event) {
		event.target.classList.toggle('switch-on');
		this.switchDerivativeCheckBox(event.target.dataset.num);
	}

	switchIntegralHandler(event) {
		event.target.classList.toggle('switch-on');
		this.switchIntegralCheckBox(event.target.dataset.num);
	}

	switchZerosHandler(event) {
		event.target.classList.toggle('switch-on');
		this.switchZerosCheckBox(event.target.dataset.num);
	}
}