/* quentin/prevkonsep
 *
 * /src/server.js - Main entry point
 *
 * coded by quentin
 * started at 30/09/2016
 */

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";

const APP_PORT = 8080;

let oApp;

// configure express
oApp = express();

// configure middleware
oApp.use( responseTime() );
oApp.use( bodyParser.json() );
oApp.use( bodyParser.urlencoded( {
    "extended": true,
} ) );

// configure base temporary route
oApp.get( "/", ( oRequest, oResponse ) => {
    oResponse.send( "Hello, world!" );
} );

// listening
oApp.listen( APP_PORT, () => {
    console.log( `Server is listeninng on port ${ APP_PORT }` ); // eslint-disable-line no-console
} );
