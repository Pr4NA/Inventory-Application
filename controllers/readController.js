const db = require("../db/queries");


async function readRouterDel(req, res) {
    const { pokemonName } = req.body; 
    try {
        await db.deletePokemon(pokemonName); 
        res.redirect("/"); 
    } catch (error) {
        console.error('Error in readRouterDel:', error); 
        res.status(500).send('Failed to delete Pokémon.'); 
    }
}

async function readRouterget(req,res) {
    const result = await db.readPokemonGroupedByType();
    if (result.message || result.error) {
      console.log(result.message || result.error);
    } else {
      console.log(result); 
    }
    res.render("read", {groupedPokemons : result} ) ;
}

module.exports = {readRouterget, readRouterDel} ;