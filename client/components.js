
Vue.component('pokemon', {
	template: '#pokemon-template',
	computed: {
		topXpokemon: function() {
			return _.take(pokemon, 15);
		},
	},
});

Vue.component('monster', {
	template: '#monster-template',
	props: ['monster'],
	data: function() {
		var monster = this.monster;
		var paddedDex = ("00"+monster.dex).slice(-3);

		return {
			showEvolution: false,
			monster,
			image: `https://www.serebii.net/pokemongo/pokemon/${paddedDex}.png`,
		};
	},
	methods: {
		toggleEvolution() {
			this.showEvolution = !this.showEvolution;
		},
	},
});

Vue.component('move', {
	template: '#move-template',
	props: ['moveID'],
	data: function() {
		return {
			move: _.find(moves, { id: this.moveID })
		};
	},
});

Vue.component('evolution', {
	template: '#evolution-template',
	props: [
		'monsterID',
		'evolution',
	],
	data: function() {
		var monster = _.find(pokemon, { id: this.monsterID });
		var paddedDex = ("00"+monster.dex).slice(-3);

		return {
			monster,
			image: `https://www.serebii.net/pokemongo/pokemon/${paddedDex}.png`,
			anchor: `#${monster.dex}`,
		};
	},
});

Vue.component('effectiveness', {
	template: '#effectiveness-template',
	props: ['monster'],
	data: function() {
		var effects = _(this.monster.types)
			.map(type => _.find(types, { id: type.id }).damage)
			.flatten()
			.groupBy('id')
			.map((group, key) => ({
				// id: key,
				name:			_.find(types, { id: key }).name,
				attackScalar:	_.multiply.apply(null, _.map(group, 'attackScalar')).toFixed(3),
			}))
			.orderBy(['attackScalar', 'name'], ['desc', 'asc'])
			.groupBy('attackScalar')
			.value();

			console.log(effects);

		return {
			effects,
		};
	},
});

Vue.component('type-tag', {
	template: '#type-tag-template',
	props: ['name'],
});

Vue.component('photo', {
	template: '#photo-template',
	props: ['monsterID'],
	data: function() {
		var monster = _.find(pokemon, { id: this.monsterID });
		var paddedDex = ("00"+monster.dex).slice(-3);

		return {
			image: `https://www.serebii.net/pokemongo/pokemon/${paddedDex}.png`,
		};
	},
});
