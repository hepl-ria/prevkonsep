/* quentin/prevkonsep
 *
 * /src/routes/main.js - Main routes
 *
 * coded by quentin
 * started at 07/10/2016
 */

import { Router } from "express";

let oRouter = new Router();

oRouter.get( "/", ( oRequest, oResponse ) => {
    oResponse.send( "Hi! This is a REST cats API" );
} );
