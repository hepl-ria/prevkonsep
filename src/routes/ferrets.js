/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/

import { Router } from "express";

import list from "../controllers/ferrets/list";
import details from "../controllers/ferrets/details";
import add from "../controllers/ferrets/add";
import destroy from "../controllers/ferrets/destroy";
import update from "../controllers/ferrets/update";

let oRouter = new Router();

oRouter.get( "/ferrets", list );
oRouter.get( "/ferrets/:slug", details );
oRouter.post( "/ferrets", add );
oRouter.delete( "/ferrets/:slug", destroy );
oRouter.put( "/ferrets/:slug", update );

export default oRouter;