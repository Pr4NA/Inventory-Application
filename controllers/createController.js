const db = require("../db/queries");

function createRouterget(req,res) {
    try {
        res.render("input") ;
      } catch (error) {
        console.error("Error rendering indexView:", error);
        res.status(500).send("An error occurred while rendering the Create page.");
      }
}

async function createRoutepost(req,res) {
    const {Name,Type,Level,Trainer} = req.body ;
    const response = await db.insertPokemon(Name, Type, Trainer, Level) ;
    console.log(response);
    res.redirect("/");
}

module.exports = {createRouterget, createRoutepost} ;