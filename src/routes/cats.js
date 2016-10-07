/* prevkonsep
 *
 * /src/routes/cats.js - REST cats routes
 *
 * coded by Anne
 * started at 7/10/2016
 */

import { Router } from "express";
import list from "../controllers/cats/list";

let oRouter = new Router();

oRouter.get( "/cats", list );
// oRouter.get( "/cats/:name", details );
// oRouter.post( "/cats", add );
// oRouter.put( "/cats/:name", update );
// oRouter.delete( "cats/:name", destroy );

export default oRouter;