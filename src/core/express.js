/*
*
* /src/core/express.js - Configure express
*
*/

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./middlewares/log";
import mainRoutes from "../routes/main";
import zouti from "zouti";

const APP_PORT = 8080;

let oApp;

export default function( iAppPort = APP_PORT ){
    if ( oApp ) {
        return oApp;
    }

    // configure express
    oApp = express();

    //configure middleware
    oApp.use( simpleLog );
    oApp.use( responseTime() );
    oApp.use( bodyParser.json() );
    oApp.use( bodyParser.urlencoded( { 
        "extended" : true,
    } ) );

    // cnfigure routes
    oApp.use( mainRoutes );
    

    //listening
    oApp.listen( iAppPort, () => {
        zouti.log( `Server is listening on port ${ iAppPort }`, "pauline/prevkonsep" );
    } );
}


