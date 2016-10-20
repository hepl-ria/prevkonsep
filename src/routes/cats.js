/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/	

import { Router } from "express";

import list from "../controllers/cats/list";
import add from "../controllers/cats/add";
import details from "../controllers/cats/details";
import update from "../controllers/cats/update";
import destroy from "../controllers/cats/destroy";

let oRouter = new Router();

//Déf. de nos routes serveur
oRouter.get( "/cats", list ); //Liste tous les chats, qui appelera un controlleur pour lister
oRouter.get( "/cats/:slug", details );
oRouter.post( "/cats", add );
oRouter.put( "/cats/:slug", update );
oRouter.delete( "/cats/:slug", destroy );

export default oRouter;