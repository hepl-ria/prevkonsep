/* auré/prevkonsep
 *
 * /src/routes/main.js - Main routes
 *
 * coded by auré
 * started at 07/10/2016
 */

import { Router } from "express";

let oRouter = new Router();

oRouter.get( "/", ( oRequest, oResponse ) => {
    oResponse.send( "Hi! This is a REST cats API!" );
} );

oRouter.get("/", (oRequest, oResponse)=>{
	oResponse.send("Hi! This is a REST dogs API!");
});

export default oRouter;