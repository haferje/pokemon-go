#!/bin/bash
cd "$(dirname "$0")"

for i in \
	'pokemon','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/pokemon.json' \
	'types','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/type.json' \
	'moves','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/move.json' \
	'flavors','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/locales/en-US/pokemon.json' \
	'released','https://pogoapi.net/api/v1/released_pokemon.json' \
	'shinies','https://pogoapi.net/api/v1/shiny_pokemon.json' \
	'exclusives','https://pogoapi.net/api/v1/raid_exclusive_pokemon.json' \
	'dittos','https://pogoapi.net/api/v1/possible_ditto_pokemon.json' \
	'weathers','https://pogoapi.net/api/v1/weather_boosts.json' \
;
do
	KEY=${i%,*};
	URL=${i#*,};
	echo "downloading $KEY"
	JSON="`wget -qO- $URL`";
	echo "var $KEY = $JSON;" > data/$KEY.js;
done
