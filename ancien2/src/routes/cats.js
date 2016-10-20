import { Router } from "express";
import list from "../controllers/cats/list";
import add from "../controllers/cats/add";
import details from "../controllers/cats/details";
import destroy from "../controllers/cats/destroy";

let oRouter = new Router();

oRouter.get( "/cats", list );
oRouter.get( "/cats/:slug", details );
oRouter.post( "/cats", add );
oRouter.put( "/cats/:slug", update );
oRouter.delete( "/cats/:slug", destroy );

export default oRouter;
