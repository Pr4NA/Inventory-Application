const pool = require("./pool");

async function insertPokemon(name, type, trainer, level) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const typeResult = await client.query('SELECT name FROM Types WHERE name = $1', [type]);
    if (typeResult.rowCount === 0) {
      await client.query('INSERT INTO Types (name) VALUES ($1)', [type]);
    }

    const trainerResult = await client.query('SELECT name FROM Trainers WHERE name = $1', [trainer]);
    if (trainerResult.rowCount === 0) {
      await client.query('INSERT INTO Trainers (name) VALUES ($1)', [trainer]);
    }

    const pokemonResult = await client.query('SELECT name FROM Pokemon WHERE name = $1', [name]);
    if (pokemonResult.rowCount > 0) {
      return { message: `Pokémon '${name}' already exists.` };
    }

    const insertPokemonQuery = `
      INSERT INTO Pokemon (name, type_name, trainer_name, level,created_at)
      VALUES ($1, $2, $3, $4, NOW() )
    `;
    await client.query(insertPokemonQuery, [name, type, trainer, level || 1]);

    await client.query('COMMIT');
    return { message: `Pokémon '${name}' successfully added.` };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(error);
    return { error: `Database error: ${error.message}` };
  } finally {
    client.release();
  }
}



async function readPokemonGroupedByType() {
    const client = await pool.connect();
    try {
      // SQL query to fetch all Pokémon grouped by their type
      const query = `
        SELECT p.type_name, p.name AS pokemon_name, p.level, t.name AS trainer_name, p.created_at
        FROM Pokemon p
        JOIN Trainers t ON p.trainer_name = t.name
        ORDER BY p.type_name, p.name;
      `;
      const result = await client.query(query);
  
      // Check if no Pokémon were found
      if (result.rowCount === 0) {
        return { message: 'No Pokémon found in the database.' };
      }
  
      // Organize the Pokémon by type
      const groupedPokemons = result.rows.reduce((acc, row) => {
        if (!acc[row.type_name]) {
          acc[row.type_name] = [];
        }
        acc[row.type_name].push({
          name: row.pokemon_name,
          level: row.level,
          trainer: row.trainer_name,
          created_at: row.created_at
        });
        return acc;
      }, {});
  
      return groupedPokemons ;

    } catch (error) {
      console.error("Error fetching Pokémon:", error);
      return { error: `Database error: ${error.message}` };
    } finally {
      client.release();
    }
  }



  async function deletePokemon(pokemonName) {
    const client = await pool.connect(); 
    try {
        const query = 'DELETE FROM Pokemon WHERE name = $1'; 
        await client.query(query, [pokemonName]); 
    } catch (error) {
        console.error('Error deleting Pokémon:', error); 
        throw error; 
    } finally {
        client.release();
    }
}


async function updatePokemon(name, trainer,level) {
    const client = await pool.connect();
    try {
        const query = `
            UPDATE Pokemon
            SET level = $1, trainer_name = $2
            WHERE name = $3;
        `;
        const result = await client.query(query, [level, trainer, name]);

        if (result.rowCount === 0) {
            return { message: "No Pokémon found with the given name." };
        }

        return { message: "Pokémon level updated successfully." };
    } catch (error) {
        console.error("Error updating Pokémon:", error);
        return { error: "Database error: " + error.message };
    } finally {
        client.release();
    }
}

module.exports = {
  insertPokemon, readPokemonGroupedByType, deletePokemon, updatePokemon
};
