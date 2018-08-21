# URL='https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/pokemon.json'

# wget $URL -O ./pokemon.js

# wget -O- $URL | sed '1 i\var pokemon = ' > pokemon.js

# RESULT="`wget -qO- $URL`"
# echo "var pokemon = $RESULT;" > pokemon.js

for i in \
	'pokemon','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/pokemon.json' \
	'types','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/type.json' \
	'moves','https://raw.githubusercontent.com/pokemongo-dev-contrib/pokemongo-json-pokedex/master/output/move.json' \
	'descriptions','https://github.com/pokemongo-dev-contrib/pokemongo-json-pokedex/blob/master/output/locales/en-US/pokemon.json' \
;
	# 'game_master','https://raw.githubusercontent.com/BrunnerLivio/deprecated-pokemongo-game-master/master/versions/latest/GAME_MASTER.json' \
do
	KEY=${i%,*};
	URL=${i#*,};
	JSON="`wget -qO- $URL`";
	echo "var $KEY = $JSON;" > data/$KEY.js;
done

