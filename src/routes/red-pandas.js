/* prevkonsep
 *
 * /src/routes/red-pandas.js - REST red pandas routes
 *
 * coded by Anne
 * started at 18/10/2016
 */

import { Router } from "express";
import list from "../controllers/red-pandas/list";
import add from "../controllers/red-pandas/add";
//import details from "../controllers/red-pandas/details";
//import destroy from "../controllers/red-pandas/destroy";
//import update from "../controllers/red-pandas/update";

let oRouter = new Router();

oRouter.get( "/red-pandas", list );
oRouter.get( "/red-pandas/:slug", details );
oRouter.post( "/red-pandas", add );
//oRouter.put( "/red-pandas/:slug", update );
//oRouter.delete( "/red-pandas/:slug", destroy );

export default oRouter;