
Vue.directive('popover', function(el, binding){
	$(el).popover({ trigger: 'focus', html: true });
});

// Vue.filter('top', function (array, count) {
//     return _.take(array, count);
// });

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
			// move: _.find(moves, { id: this.$vnode.key })
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
