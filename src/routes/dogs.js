/* auré/prevkonsep
 *
 * /src/routes/dogs.js - REST dogs routes
 *
 * coded by auré
 * started at 07/10/2016
 */

import { Router } from "express";

import list from "../controllers/dogs/list";
import add from "../controllers/dogs/add";
import details from "../controllers/dogs/details";
import update from "../controllers/dogs/update";
import destroy from "../controllers/dogs/destroy";

let oRouter = new Router();

oRouter.get( "/dogs", list );
oRouter.get( "/dogs/:slug", details );
oRouter.post( "/dogs", add );
oRouter.put( "/dogs/:slug", update );
oRouter.delete( "/dogs/:slug", destroy );

export default oRouter;