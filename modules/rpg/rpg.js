class Rpg {
	constructor() {
		this.rpg = function () {
			const variantOtveta = document.getElementById('text')
			const chooseEl = document.getElementById('choose-buttons')

			let state = {}

			function startGame() {
				state = {}
				showSituation(1)
			}

			function showSituation(eventNumber) {
				const makeAChoise = situations.find(situation => situation.id === eventNumber)
				variantOtveta.innerText = makeAChoise.text
				document.getElementById('question-image').src = makeAChoise.image;
				while (chooseEl.firstChild) {
					chooseEl.removeChild(chooseEl.firstChild)
				}

				makeAChoise.options.forEach(option => {
					if (showOption(option)) {
						const button = document.createElement('button')
						button.innerText = option.text
						button.classList.add('menu-item-button')
						button.addEventListener('click', () => chooseSituation(option))
						chooseEl.appendChild(button)
					}
				})
			}

			function showOption(option) {
				return option.requiredState == null || option.requiredState(state)
			}

			function chooseSituation(option) {
				const nextSituationID = option.nextText
				if (nextSituationID <= 0) {
					return startGame()
				}
				state = Object.assign(state, option.setState)
				showSituation(nextSituationID)
			}

			const situations = [
				{
					id: 1,
					image: "../components/Images/saske.jpg",
					text: 'Вы проснулись и увидели надменного парня, с глазами красного и фиолетового цвета',
					options: [
						{
							text: 'Выслушать его и помочь спрятаться',
							setState: { saske: true },
							nextText: 2
						},
						{
							text: 'Игнорировать',
							nextText: 2
						}
					]
				},
				{
					id: 2,
					image: "../components/Images/sakura.jpg",
					text: 'Вы пошли дальше и встретили розоволосую девушку',
					options: [
						{
							text: 'Рассказать куда вы спрятали того парня, в обмен на повязку с каким-то перечеркнутым знаком и сюрикены',
							requiredState: (currentState) => currentState.saske,
							setState: { saske: false, hat: true },
							nextText: 3
						},
						{
							text: 'Рассказать куда вы спрятали того парня, в обмен на странный плащ с красными облаками',
							requiredState: (currentState) => currentState.saske,
							setState: { saske: false, coat: true },
							nextText: 3
						},
						{
							text: 'Пройти мимо незамеченными',
							nextText: 3
						}
					]
				},
				{
					id: 3,
					image: "../components/Images/naruto1.jpg",
					text: 'Вы ушли от девушки, очень устали и забрели в деревню, на главной площади разорался парень с желтыми волосами и полосами на щеках ',
					options: [
						{
							text: 'Пойти узнать зачем он орет',
							nextText: 4
						},
						{
							text: 'Поискать таверну',
							nextText: 5
						},
						{
							text: 'Пристроиться к бомжам и поспать',
							nextText: 6
						}
					]
				},
				{
					id: 4,
					image: "../components/Images/zan.jpg",
					text: 'Как только вы подошли к парню, он убил вас ',
					options: [
						{
							text: 'Заново',
							nextText: -1
						}
					]
				},
				{
					id: 5,
					image: "../components/Images/zan.jpg",
					text: 'Вы пришли в таверну, знатно "отдохнули", устроив дебош. Вас привели к желтоволосому парню и он убил вас',
					options: [
						{
							text: 'Заново',
							nextText: -1
						}
					]
				},
				{
					id: 6,
					image: "../components/Images/b.png",
					text: 'Вы знатно выспались, благодаря местным бомжам, и решили все-таки узнать зачем тот чел орет',
					options: [
						{
							text: 'Узнать зачем он орет',
							nextText: 7
						}
					]
				},
				{
					id: 7,
					image: "../components/Images/nar.jpg",
					text: 'Вы подошли к желтоволосому парню. Он пытается вас убить',
					options: [
						{
							text: 'Бежать',
							nextText: 8
						},
						{
							text: 'Надеть повязку, перекфалифицироваться в ниндзя и кидать сюрикены',
							requiredState: (currentState) => currentState.hat,
							nextText: 9
						},
						{
							text: 'Закутаться в плащ и сделать вид, что вас нет',
							requiredState: (currentState) => currentState.coat,
							nextText: 10
						},
						{
							text: 'Рассказать куда вы спрятали того парня, в обмен на свое спасение (вдруг он из-за этого орет)',
							requiredState: (currentState) => currentState.saske,
							nextText: 11
						}
					]
				},
				{
					id: 8,
					image: "../components/Images/zan.jpg",
					text: 'Желтоволосый парень догнал и убил вас',
					options: [
						{
							text: 'Заново',
							nextText: -1
						}
					]
				},
				{
					id: 9,
					image: "../components/Images/zan.jpg",
					text: 'Желтоволосый парень увидел вашу повязку и, крикнув "ТАК ТЫ ШИНОБИ ПРЕДАТЕЛЬ", убил вас',
					options: [
						{
							text: 'Заново',
							nextText: -1
						}
					]
				},
				{
					id: 10,
					image: "../components/Images/zan.jpg",
					text: 'Желтоволосый парень увидел ваш плащ и, крикнув "САКУРА СМОТРИ КАК НА 1 АКАЦУКИ СТАНОВИТСЯ МЕНЬШЕ" убил вас',
					options: [
						{
							text: 'Заново',
							nextText: -1
						}
					]
				},
				{
					id: 11,
					image: "../components/Images/nd.jpg",
					text: 'Желтоволосый парень снова заорал "ЛЮБИМЫЙ, ВЕРНИСЬ В ДЕРЕВНЮ". Вы вместе нашли парня и привели в деревю',
					options: [
						{
							text: 'Поздравляю - игра пройдена. Саске вернулся в деревню.',
							nextText: -1
						}
					]
				}
			]

			startGame()
		}
	}
}