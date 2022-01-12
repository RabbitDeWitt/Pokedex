const getUrlPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
fetch(getUrlPokemon(index + 1)).then(response => response.json()))    
const pokemonPromises = generatePokemonPromises()


const generateHTML = pokemons => pokemons.reduce((accumlator, { name, id, types, sprites }) => {
    const elementsTypes = types.map(typeInfo => typeInfo.type.name)

    const imagePokemon = sprites.front_default

        accumlator += `
        <li class="card ${elementsTypes[0]}">
        <img class="card-image" alt="${name}" src="${imagePokemon}"/>
        <h2 class="card-title">${id}. ${name}</h2>
        <p class="card-subtitle">${elementsTypes.join(' | ')}</p>
        </li>
        `
        return accumlator
    }, '')    


const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]') 
    ul.innerHTML = pokemons
}

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
