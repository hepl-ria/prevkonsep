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

let oRouter = new Router();

oRouter.get( "/cats", list );
// oRouter.get( "/cats/:name", details );
oRouter.post( "/cats", add );
// oRouter.put( "/cats/:name", update );
// oRouter.delete( "/cats/:name", destroy );

export default oRouter;
