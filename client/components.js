
Vue.component('pokemon', {
	template: '#pokemon-template',
	computed: {
		top5pokemon: function() {
			return _.take(pokemon, 5);
		},
	},
});

Vue.component('monster', {
	template: '#monster-template',
	props: ['monster'],
	methods: {
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
	props: ['monsterID'],
	data: function() {
		var monster = _.find(pokemon, { id: this.monsterID });
		var paddedDex = ("00"+monster.dex).slice(-3);

		return {
			monster,
			image: `https://www.serebii.net/pokemongo/pokemon/${paddedDex}.png`,
		};
	},
});

Vue.component('effectiveness', {
	template: '#effectiveness-template',
	props: ['monster'],
	data: function() {
		var effective = _.map(this.monster.types, type => _.find(types, { id: type.id }));
		var flatened = _.concat(effective[0].damage, effective[1] && effective[1].damage || []);
		var grouped = _.groupBy(flatened, type => type.id);
		var summed = _.map(grouped, group => {
			return { id: group[0].id, attackScalar: _.reduce(_.map(group, 'attackScalar'), (a,b)=>a*b) };
		});
		var ordered = _.orderBy(summed, ['attackScalar', 'id'], ['desc', 'asc']);
		effects = _.groupBy(ordered, eff => eff.attackScalar.toFixed(3));
// debugger;
		console.log(effects);

		return {
			effects,
		};
	},
});
