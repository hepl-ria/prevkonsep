/* ria/prevkonsep
 *
 * /src/routes/cats.js - REST cats routes
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 07/10/2016
*/

import { Router } from "express";
import list from "../controllers/cats/list";
import add from "../controllers/cats/add";
import details from "../controllers/cats/details";
import destroy from "../controllers/cats/destroy";
import update from "../controllers/cats/update";

let oRouter = new Router();

oRouter.get( "/cats", list );
oRouter.get( "/cats/:slug", details );
oRouter.post( "/cats", add );
oRouter.put( "/cats/:slug", update );
oRouter.delete( "/cats/:slug", destroy );

export default oRouter;
