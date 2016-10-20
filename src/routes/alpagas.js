/* quentin/prevkonsep
 *
 * /src/routes/alpagas.js - REST alpagas routes
 *
 * coded by quentin
 * started at 20/10/2016
 */

import { Router } from "express";

import list from "../controllers/alpagas/list";
import add from "../controllers/alpagas/add";
import details from "../controllers/alpagas/details";
import update from "../controllers/alpagas/update";
import destroy from "../controllers/alpagas/destroy";

let oRouter = new Router();

oRouter.get( "/alpagas", list );
oRouter.get( "/alpagas/:slug", details );
oRouter.post( "/alpagas", add );
oRouter.put( "/alpagas/:slug", update );
oRouter.delete( "/alpagas/:slug", destroy );

export default oRouter;
