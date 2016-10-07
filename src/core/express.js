/* ria/prevkonsep
 *
 * /src/core/express.js - Config express
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 07/10/2016
*/

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./middlewares/log"; // On peut oublier le .js de log.js

const APP_PORT = 8080;

let oApp;

export default function( iAppPort = APP_PORT ) {

    if ( oApp ) {
        return oApp;
    }
    // config express
    oApp = express();

    // configure middleware
    oApp.use( simpleLog );
    oApp.use( responseTime() );
    oApp.use( bodyParser.json() );
    oApp.use( bodyParser.urlencoded( {
        "extended": true,
    } ) );

    // configure base temporary route
    oApp.get( "/", ( oRequest, oResponse ) => {
        oResponse.send( "Hello, HEPL !" );
    } );

    // listening
    oApp.listen( iAppPort, () => {
        console.log( `server is listening on port ${ iAppPort }` ); // eslint-disable-line no-console
    } );

}
