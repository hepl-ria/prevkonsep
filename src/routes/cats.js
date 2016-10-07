/* quentin/prevkonsep
 *
 * /src/routes/cats.js - REST cast routes
 *
 * coded by quentin
 * started at 07/10/2016
 */

import { Router } from "express";
import list from "../controllers/cast/list";

let oRouter = new Router();

oRouter.get( "/cats", list );
// oRouter.get( "/cats/:name", details );
// oRouter.post( "/cats", add );
// oRouter.put( "/cats/:name", update );
// oRouter.delete( "/cats/:name", destroy );

export default oRouter;
