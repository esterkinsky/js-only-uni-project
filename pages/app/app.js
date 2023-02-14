class App extends Component {
	constructor(options) {
		super(options);

		this.menu = new Menu({
			id: 'menu',
			parent: this.id,
			template: template.Menu,
			callbacks: {
				showMenuItem: (name) => this.showMenuItem(name)
			}
		})

		this.calculator = new CalculatorComponent({
			id: 'calculator',
			parent: this.id,
			template: template.calculatorTemplate,
			className: 'hide'
		})

		this.polycalculator = new PolyComponent({
			id: 'polycalculator',
			parent: this.id,
			template: template.polyTemplate,
			className: 'hide'
		})

		this.RPGContent = new RPGComponent({
			id: 'RPGContent',
			parent: this.id,
			template: template.rpgTemplate,
			className: 'hide'
		})

		this.shotContent = new ShootShooter({
			id: 'shotContent',
			parent: this.id,
			template: template.shoterTemplate,
			className: 'hide'
		})

		this.rootsContent = new RootsComponent({
			id: 'rootsContent',
			parent: this.id,
			template: template.rootsTemplate,
			className: 'hide'
		})

		this.canvasContent = new Graph2DComponent({
			id: 'canvasContent',
			parent: this.id,
			template: template.Graph2D,
			className: 'hide'
		})

		this.canvas3dContent = new Graph3DComponent({
			id: 'canvas3dContent',
			parent: this.id,
			template: template.Graph3D,
			className: 'hide'
		})
	}

	showMenuItem(name) {
		this.calculator.hide();
		this.polycalculator.hide();
		this.RPGContent.hide();
		this.shotContent.hide();
		this.rootsContent.hide();
		this.canvasContent.hide();
		this.canvas3dContent.hide();
		this[name].show();
	}

}