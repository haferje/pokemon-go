#!/bin/bash
cd "$(dirname "$0")"

for i in \
	'pokemon','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/pokemon.json' \
	'types','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/type.json' \
	'moves','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/move.json' \
	'flavors','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/locales/en-US/pokemon.json' \
;
do
	KEY=${i%,*};
	URL=${i#*,};
	JSON="`wget -qO- $URL`";
	echo "var $KEY = $JSON;" > data/$KEY.js;
done
