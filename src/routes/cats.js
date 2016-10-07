/* leny/prevkonsep
 *
 * /src/routes/cats.js - REST cats routes
 *
 * coded by leny@flatLand!
 * started at 07/10/2016
 */

import { Router } from "express";

import list from "../controllers/cats/list";
import add from "../controllers/cats/add";

let oRouter = new Router();

oRouter.get( "/cats", list );
// oRouter.get( "/cats/:name", details );
oRouter.post( "/cats", add );
// oRouter.put( "/cats/:name", update );
// oRouter.delete( "/cats/:name", destroy );

export default oRouter;
