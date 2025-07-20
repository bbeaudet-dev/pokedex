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

// Get all Pokemon types
export const POKEMON_TYPES = Object.keys(TYPES)

// Evolution stage icons
export const EVOLUTION_STAGES = {
  BASE: '●',
  MIDDLE: '●●',
  FINAL: '●●●',
  NONE: '○'
}

// Special category icons
export const SPECIAL_CATEGORIES = {
  LEGENDARY: '★',
  MYTHICAL: '☆',
  PSEUDO_LEGENDARY: '◆'
}

// Evolution stage display names
export const EVOLUTION_STAGE_NAMES = {
  BASE: 'Base',
  MIDDLE: 'Middle',
  FINAL: 'Final',
  NONE: 'None'
}

// Special category display names
export const SPECIAL_CATEGORY_NAMES = {
  LEGENDARY: 'Legendary',
  MYTHICAL: 'Mythical',
  PSEUDO_LEGENDARY: 'Pseudo Legendary'
}

// Comprehensive generation data
export const GENERATIONS = {
  1: {
    id: 1,
    name: 'Generation I',
    displayName: 'Gen I',
    region: 'Kanto',
    year: 1996,
    games: ['Red', 'Blue', 'Yellow'],
    pokemonCount: 151
  },
  2: {
    id: 2,
    name: 'Generation II',
    displayName: 'Gen II',
    region: 'Johto',
    year: 1999,
    games: ['Gold', 'Silver', 'Crystal'],
    pokemonCount: 100
  },
  3: {
    id: 3,
    name: 'Generation III',
    displayName: 'Gen III',
    region: 'Hoenn',
    year: 2002,
    games: ['Ruby', 'Sapphire', 'Emerald'],
    pokemonCount: 135
  },
  4: {
    id: 4,
    name: 'Generation IV',
    displayName: 'Gen IV',
    region: 'Sinnoh',
    year: 2006,
    games: ['Diamond', 'Pearl', 'Platinum'],
    pokemonCount: 107
  },
  5: {
    id: 5,
    name: 'Generation V',
    displayName: 'Gen V',
    region: 'Unova',
    year: 2010,
    games: ['Black', 'White', 'Black 2', 'White 2'],
    pokemonCount: 156
  },
  6: {
    id: 6,
    name: 'Generation VI',
    displayName: 'Gen VI',
    region: 'Kalos',
    year: 2013,
    games: ['X', 'Y', 'Omega Ruby', 'Alpha Sapphire'],
    pokemonCount: 72
  },
  7: {
    id: 7,
    name: 'Generation VII',
    displayName: 'Gen VII',
    region: 'Alola',
    year: 2016,
    games: ['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon'],
    pokemonCount: 88
  },
  8: {
    id: 8,
    name: 'Generation VIII',
    displayName: 'Gen VIII',
    region: 'Galar',
    year: 2019,
    games: ['Sword', 'Shield', 'Brilliant Diamond', 'Shining Pearl', 'Legends: Arceus'],
    pokemonCount: 89
  },
  9: {
    id: 9,
    name: 'Generation IX',
    displayName: 'Gen IX',
    region: 'Paldea',
    year: 2022,
    games: ['Scarlet', 'Violet'],
    pokemonCount: 120
  }
}
