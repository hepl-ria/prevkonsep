/* ria/prevkonsep
 *
 * /server.js -
 *
 * Coded by mucht@mathieuclaessens.be
 * started at 30/09/2016
*/

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./core/middlewares/log"; // On peut oublier le .js de log.js

const APP_PORT = 8080;

let oApp;

// config express
oApp = express();

// configure middleware
oApp.use( simpleLog() );
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
    console.log( `server is listening on port ${ APP_PORT }` ); // eslint-disable-line no-console
} );
