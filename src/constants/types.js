// Comprehensive Pokemon types object with all related data
export const TYPES = {
  normal: {
    name: 'Normal',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/normal.svg',
    color: '#A8A77A',
    description: 'The Normal type is the most basic type of Pokémon.'
  },
  fighting: {
    name: 'Fighting',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fighting.svg',
    color: '#C22E28',
    description: 'Fighting Pokémon are strong and physically-oriented.'
  },
  flying: {
    name: 'Flying',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/flying.svg',
    color: '#A98FF3',
    description: 'Flying Pokémon can soar through the air.'
  },
  poison: {
    name: 'Poison',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/poison.svg',
    color: '#A33EA1',
    description: 'Poison Pokémon use toxic substances in battle.'
  },
  ground: {
    name: 'Ground',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ground.svg',
    color: '#E2BF65',
    description: 'Ground Pokémon are connected to the earth.'
  },
  rock: {
    name: 'Rock',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/rock.svg',
    color: '#B6A136',
    description: 'Rock Pokémon are solid and durable.'
  },
  bug: {
    name: 'Bug',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/bug.svg',
    color: '#A6B91A',
    description: 'Bug Pokémon are small but can be quite powerful.'
  },
  ghost: {
    name: 'Ghost',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ghost.svg',
    color: '#735797',
    description: 'Ghost Pokémon are mysterious and supernatural.'
  },
  steel: {
    name: 'Steel',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/steel.svg',
    color: '#B7B7CE',
    description: 'Steel Pokémon are metallic and very durable.'
  },
  fire: {
    name: 'Fire',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fire.svg',
    color: '#EE8130',
    description: 'Fire Pokémon are hot and passionate.'
  },
  water: {
    name: 'Water',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/water.svg',
    color: '#6390F0',
    description: 'Water Pokémon are fluid and adaptable.'
  },
  grass: {
    name: 'Grass',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/grass.svg',
    color: '#7AC74C',
    description: 'Grass Pokémon are connected to nature.'
  },
  electric: {
    name: 'Electric',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/electric.svg',
    color: '#F7D02C',
    description: 'Electric Pokémon are charged with energy.'
  },
  psychic: {
    name: 'Psychic',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/psychic.svg',
    color: '#F95587',
    description: 'Psychic Pokémon have mental powers.'
  },
  ice: {
    name: 'Ice',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/ice.svg',
    color: '#96D9D6',
    description: 'Ice Pokémon are cool and crystalline.'
  },
  dragon: {
    name: 'Dragon',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dragon.svg',
    color: '#6F35FC',
    description: 'Dragon Pokémon are legendary and powerful.'
  },
  dark: {
    name: 'Dark',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/dark.svg',
    color: '#705746',
    description: 'Dark Pokémon are mysterious and cunning.'
  },
  fairy: {
    name: 'Fairy',
    icon: 'https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/fairy.svg',
    color: '#D685AD',
    description: 'Fairy Pokémon are magical and enchanting.'
  }
}

// Type effectiveness chart (simplified - you can expand this)
export const TYPE_EFFECTIVENESS = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, steel: 2, fire: 1, water: 1, grass: 1, electric: 1, psychic: 0.5, ice: 2, dragon: 1, dark: 2, fairy: 0.5 },
  flying: { fighting: 2, rock: 0.5, bug: 2, steel: 0.5, fire: 1, grass: 2, electric: 0.5, ice: 1, dragon: 1, dark: 1, fairy: 1 },
  poison: { poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fire: 1, water: 1, grass: 2, electric: 1, psychic: 1, ice: 1, dragon: 1, dark: 1, fairy: 2 },
  ground: { poison: 2, rock: 2, steel: 2, fire: 2, water: 1, grass: 0.5, electric: 2, ice: 1, dragon: 1, dark: 1, fairy: 1 },
  rock: { fighting: 0.5, flying: 2, ground: 0.5, bug: 2, steel: 0.5, fire: 2, water: 1, grass: 1, electric: 1, psychic: 1, ice: 2, dragon: 1, dark: 1, fairy: 1 },
  bug: { fighting: 0.5, flying: 0.5, poison: 0.5, ghost: 0.5, steel: 0.5, fire: 0.5, water: 1, grass: 2, electric: 1, psychic: 2, ice: 1, dragon: 1, dark: 2, fairy: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  steel: { rock: 2, steel: 0.5, fire: 0.5, water: 0.5, grass: 1, electric: 0.5, psychic: 1, ice: 2, dragon: 1, dark: 1, fairy: 2 },
  fire: { rock: 0.5, bug: 2, steel: 2, fire: 0.5, water: 0.5, grass: 2, electric: 1, psychic: 1, ice: 2, dragon: 0.5, dark: 1, fairy: 1 },
  water: { ground: 2, rock: 2, steel: 1, fire: 2, water: 0.5, grass: 0.5, electric: 1, psychic: 1, ice: 1, dragon: 0.5, dark: 1, fairy: 1 },
  grass: { poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, steel: 0.5, fire: 0.5, water: 2, grass: 0.5, electric: 1, psychic: 1, ice: 1, dragon: 0.5, dark: 1, fairy: 1 },
  electric: { flying: 2, ground: 0, water: 2, grass: 0.5, electric: 0.5, psychic: 1, ice: 1, dragon: 0.5, dark: 1, fairy: 1 },
  psychic: { fighting: 2, poison: 2, steel: 0.5, psychic: 0.5, ice: 1, dragon: 1, dark: 0, fairy: 1 },
  ice: { flying: 2, ground: 2, steel: 0.5, fire: 0.5, water: 0.5, grass: 2, electric: 1, psychic: 1, ice: 0.5, dragon: 2, dark: 1, fairy: 1 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, ghost: 2, psychic: 2, ice: 1, dragon: 1, dark: 0.5, fairy: 0.5 },
  fairy: { fighting: 2, poison: 0.5, dragon: 2, steel: 0.5, dark: 2 }
}

// Array of Pokemon type keys for easy iteration
export const POKEMON_TYPES = Object.keys(TYPES) 