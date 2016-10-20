/* prevkonsep
 *
 * /src/routes/main.js - Main routes
 *
 * coded by Anne
 * started at 7/10/2016
 */

 import { Router } from "express";

 let oRouter = new Router();

 oRouter.get( "/", ( oRequest, oResponse ) => {
    oResponse.send( "Hi! This is a REST animals API!" );
 } );

 export default oRouter;