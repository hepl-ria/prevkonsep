/* quentin/prevkonsep
 *
 * /src/core/express.js - Configure express
 *
 * coded by quentin
 * started at 07/10/2016
 */

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./middlewares/log";

const APP_PORT = 8080;

let oApp;

export default function( iAppPort = APP_PORT ) {
    if ( oApp ) {
        return oApp;
    }

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
    oApp.get( "/", ( oRequest, oResponse ) => {
        oResponse.send( "Hello, world!" );
    } );

    // listening
    oApp.listen( iAppPort, () => {
        console.log( `Server is listeninng on port ${ APP_PORT }` ); // eslint-disable-line no-console
    } );

}
