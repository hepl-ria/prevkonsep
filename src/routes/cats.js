/*
*
* /src/core/cats.js - REST cats routes
*
*/

import { Router } from "express";

import list from "../controllers/cats/list";
import add from "../controllers/cats/add";
import details from "../controllers/cats/details";

let oRouter = new Router();

oRouter.get( "/cats", list );
oRouter.get( "/cats/:slug", details );
oRouter.post( "/cats", add );
//oRouter.put( "/cats/:slug", update );
//oRouter.delete( "/cats/:slug", destroy );


export default oRouter;