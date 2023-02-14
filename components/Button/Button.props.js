export class ButtonProps {
	constructor(callbacks = {}) {
		this.callbacks = callbacks;
	}

	callbacks = {
		appearance: 'primary' | 'ghost',
		arrow: 'right' | 'down' | 'none',
	}
}