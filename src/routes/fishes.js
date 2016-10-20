/*
*
* /src/core/fishes.js - REST fishes routes
*
*/

import { Router } from "express";

import list from "../controllers/fishes/list";
import add from "../controllers/fishes/add";
import details from "../controllers/fishes/details";
import destroy from "../controllers/fishes/destroy";
import update from "../controllers/fishes/update";

let oRouter = new Router();

oRouter.get( "/fishes", list );
oRouter.get( "/fishes/:slug", details );
oRouter.post( "/fishes", add );
oRouter.put( "/fishes/:slug", update );
oRouter.delete( "/fishes/:slug", destroy );


export default oRouter;