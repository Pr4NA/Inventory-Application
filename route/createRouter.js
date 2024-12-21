const { Router } = require("express");
const createRouter = Router();

const {createRouterget, createRoutepost} = require('../controllers/createController')

createRouter.get("/",createRouterget) ;
createRouter.post("/",createRoutepost) ;

module.exports = createRouter;