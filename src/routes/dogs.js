/* ria/prevkonsep
 *
 * /src/routes/dogs.js - REST dogs routes
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 14/10/2016
*/

import { Router } from "express";
import list from "../controllers/dogs/list";
import add from "../controllers/dogs/add";
import details from "../controllers/dogs/details";
// import destroy from "../controllers/dogs/destroy";
// import update from "../controllers/dogs/update";

let oRouter = new Router();

oRouter.get( "/dogs", list );
oRouter.post( "/dogs", add );
oRouter.get( "/dogs/:slug", details );
// oRouter.delete( "/dogs/:slug", destroy );
// oRouter.put( "/dogs/:slug", update );

export default oRouter;
