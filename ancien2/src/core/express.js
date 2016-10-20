/* leny/prevkonsep
 *
 * /src/core/express.js - Main entry point
 *
 * coded by leny@flatLand!
 * started at 07/10/2016
 */

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import zouti from "zouti";
import mainRoutes from "../routes/main";
import simpleLog from "./middlewares/log";
import catsRoutes from "../routes/cats";

const APP_PORT = 8080;

let oApp;

export default function( iAppPort = APP_PORT ) { // Pouvoir utiliser express dans autre part qu'ici
    if( oApp ) {
        return oApp;
    } // Si la fonction oApp existe déjà, on s'arrête la

    // configure express
    oApp = express();

// configure middleware
    oApp.use( simpleLog );
    oApp.use( responseTime() );
    oApp.use( bodyParser.json() );
    oApp.use( bodyParser.urlencoded( {
        "extended": true,
    } ) );

// configure base temporary route
    oApp.use( mainRoutes );
    oApp.use( catsRoutes );

// listening
    oApp.listen( iAppPort, () => {
        zouti.log( `Server is listening on port ${ iAppPort }` ); // eslint-disable-line no-console
    } );

}

