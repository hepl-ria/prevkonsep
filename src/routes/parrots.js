import { Router } from "express";

import list from "../controllers/parrots/list";
import add from "../controllers/parrots/add";
import update from "../controllers/parrots/update";
import destroy from "../controllers/parrots/destroy";
import details from "../controllers/parrots/details";

let oRouter = new Router();

oRouter.get( "/parrots", list );

oRouter.get( "/parrots/:slug", details );

oRouter.post( "/parrots", add );

oRouter.put( "/parrots/:slug", update );

oRouter.delete( "/parrots/:slug", destroy );


export default oRouter;
