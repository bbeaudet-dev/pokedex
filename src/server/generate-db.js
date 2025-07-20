import fs from 'fs'
import axios from 'axios'

const POKEAPI = 'https://pokeapi.co/api/v2';

const LEGENDARIES = [
  // Add more as needed for later gens
  'articuno', 'zapdos', 'moltres', 'mewtwo', 'raikou', 'entei', 'suicune', 'lugia', 'ho-oh',
  'regirock', 'regice', 'registeel', 'latias', 'latios', 'kyogre', 'groudon', 'rayquaza',
  'uxie', 'mesprit', 'azelf', 'dialga', 'palkia', 'heatran', 'regigigas', 'giratina', 'cresselia',
  'cobalion', 'terrakion', 'virizion', 'tornadus', 'thundurus', 'reshiram', 'zekrom', 'landorus',
  'kyurem', 'xerneas', 'yveltal', 'zygarde', 'tapu-koko', 'tapu-lele', 'tapu-bulu', 'tapu-fini',
  'cosmog', 'cosmoem', 'solgaleo', 'lunala', 'nihilego', 'buzzwole', 'pheromosa', 'xurkitree',
  'celesteela', 'kartana', 'guzzlord', 'necrozma', 'magearna', 'marshadow', 'poipole', 'naganadel',
  'stakataka', 'blacephalon', 'zeraora', 'zacian', 'zamazenta', 'eternatus', 'kubfu', 'urshifu',
  'regieleki', 'regidrago', 'glastrier', 'spectrier', 'calyrex', 'enamorus'
];
const MYTHICALS = [
  'mew', 'celebi', 'jirachi', 'deoxys', 'phione', 'manaphy', 'darkrai', 'shaymin', 'arceus',
  'victini', 'keldeo', 'meloetta', 'genesect', 'diancie', 'hoopa', 'volcanion', 'magearna',
  'marshadow', 'zeraora', 'meltan', 'melmetal'
];
const PSEUDO_LEGENDARIES = [
  'dragonite', 'tyranitar', 'salamence', 'metagross', 'garchomp', 'hydreigon', 'goodra',
  'kommo-o', 'dragapult', 'baxcalibur'
];

function getEvolutionStage(chain, name) {
  name = name.toLowerCase();
  if (chain.species.name === name) {
    if (chain.evolves_to.length === 0) return 'NONE';
    return 'BASE';
  }
  for (const evo of chain.evolves_to) {
    if (evo.species.name === name) {
      if (evo.evolves_to.length === 0) return 'FINAL';
      return 'MIDDLE';
    }
    const stage = getEvolutionStage(evo, name);
    if (stage) return stage;
  }
  return 'NONE';
}

async function getPokemonData(id) {
  const { data: poke } = await axios.get(`${POKEAPI}/pokemon/${id}`);
  const { data: species } = await axios.get(poke.species.url);

  // Get types
  const types = poke.types.map(t => t.type.name).join('/');

  // Get stats
  const stats = {};
  poke.stats.forEach(stat => {
    const key = stat.stat.name.replace('-', '');
    stats[key] = stat.base_stat;
  });

  // Get description
  const entry = species.flavor_text_entries.find(
    e => e.language.name === 'en'
  );
  const description = entry ? entry.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') : '';

  // Get evolution stage
  let evolutionStage = 'NONE';
  try {
    const { data: evoData } = await axios.get(species.evolution_chain.url);
    evolutionStage = getEvolutionStage(evoData.chain, poke.name);
  } catch (e) {
    evolutionStage = 'NONE';
  }

  // Special categories
  const specialCategories = [];
  if (LEGENDARIES.includes(poke.name)) specialCategories.push('LEGENDARY');
  if (MYTHICALS.includes(poke.name)) specialCategories.push('MYTHICAL');
  if (PSEUDO_LEGENDARIES.includes(poke.name)) specialCategories.push('PSEUDO_LEGENDARY');

  return {
    id: poke.id,
    name: poke.name.charAt(0).toUpperCase() + poke.name.slice(1),
    type: types,
    evolutionStage,
    specialCategories,
    description,
    hp: stats.hp || 0,
    attack: stats.attack || 0,
    defense: stats.defense || 0,
    spAtk: stats.specialattack || 0,
    spDef: stats.specialdefense || 0,
    speed: stats.speed || 0
  };
}

(async () => {
  // Get the total number of Pokémon from the API
  const { data: { count } } = await axios.get(`${POKEAPI}/pokemon-species?limit=1`);
  const maxId = count;

  const pokemon = [];
  for (let id = 1; id <= maxId; id++) {
    try {
      console.log(`Fetching #${id}...`);
      const data = await getPokemonData(id);
      pokemon.push(data);
    } catch (e) {
      console.error(`Failed to fetch #${id}:`, e.message);
    }
  }
  fs.writeFileSync('db.json', JSON.stringify({ pokemon }, null, 2));
  console.log('Done! Saved to db.json');
})();