const { Router } = require("express");
const updateRouter = Router();

const {updateRouterget, updateRoutepost} = require('../controllers/updateController')

updateRouter.get("/",updateRouterget) ;
updateRouter.post("/",updateRoutepost) ;

module.exports = updateRouter ;