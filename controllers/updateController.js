const db = require("../db/queries");
const pool = require("../db/pool");

async function updateRouterget(req, res) {
    const { name } = req.query;
    try {
        const client = await pool.connect();
        const query = 'SELECT * FROM Pokemon WHERE name = $1';
        const result = await client.query(query, [name]);

        if (result.rowCount === 0) {
            return res.status(404).send("Pokémon not found.");
        }

        const pokemon = result.rows[0]; 
        res.render("update", { pokemon });
    } catch (error) {
        console.error("Error fetching Pokémon:", error);
        res.status(500).send("Internal Server Error.");
    }
}

async function updateRoutepost(req,res) {
    const {Name,Level,Trainer} = req.body ;
    const response = await db.updatePokemon(Name, Trainer, Level) ;
    console.log(response);
    res.redirect("/");
}

module.exports = {updateRouterget, updateRoutepost} ;