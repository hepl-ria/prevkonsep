/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/	

import { Router } from "express";
import list from "../controllers/cats/list";
import add from "../controllers/cats/add";

let oRouter = new Router();

//Déf. de nos routes serveur
oRouter.get( "/cats", list ); //Liste tous les chats, qui appelera un controlleur pour lister
//oRouter.get( "/cats/:name", details );
oRouter.post( "/cats", add );
//oRouter.put( "/cats/:name", update );
//oRouter.delete( "/cats/:name", destroy );

export default oRouter;