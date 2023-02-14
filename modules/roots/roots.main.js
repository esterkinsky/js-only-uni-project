class RootsComponent extends Component {
	constructor(options) {
		super(options)
		this.res = document.getElementById('calcRoots')
		this.res.addEventListener('click', () => this.result())
	}
	result() {
		const Rootss = new Roots
		var a = document.getElementById('a').value - 0
		var b = document.getElementById('b').value - 0
		var c = document.getElementById('c').value - 0
		var d = document.getElementById('d').value - 0
		document.getElementById('rootsResult').innerHTML = 'Результат: ' + Rootss.getRoots(a, b, c, d)
	}
}