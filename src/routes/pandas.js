/* prevkonsep
 *
 * /src/routes/red-pandas.js - REST red pandas routes
 *
 * coded by Anne
 * started at 18/10/2016
 */

import { Router } from "express";
import list from "../controllers/pandas/list";
import add from "../controllers/pandas/add";
import details from "../controllers/pandas/details";
import destroy from "../controllers/pandas/destroy";
import update from "../controllers/pandas/update";

let oRouter = new Router();

oRouter.get( "/pandas", list );
oRouter.get( "/pandas/:slug", details );
oRouter.post( "/pandas", add );
oRouter.put( "/pandas/:slug", update );
oRouter.delete( "/pandas/:slug", destroy );

export default oRouter;