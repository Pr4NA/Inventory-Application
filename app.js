const express = require("express");
const app = express();

const path = require("node:path");
const createRouter = require("./route/createRouter");
const readRouter = require("./route/readRouter");
const updateRouter = require("./route/updateRouter") ;

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/create",createRouter) ;
app.use("/",readRouter) ;
app.use("/update", updateRouter) ;

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });

