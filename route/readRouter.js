const { Router } = require("express");
const readRouter = Router();

const {readRouterget, readRouterDel} = require('../controllers/readController')

readRouter.get("/",readRouterget) ;
readRouter.post("/delete", readRouterDel) ;

module.exports = readRouter;