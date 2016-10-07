/* leny/prevkonsep
 *
 * /src/core/express.js - Configure express
 *
 * coded by leny@flatLand!
 * started at 07/10/2016
 */

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import simpleLog from "./middlewares/log";
import mainRoutes from "../routes/main";

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

    // configure routes
    oApp.use( mainRoutes );

    // listening
    oApp.listen( iAppPort, () => {
        console.log( `Server is listening on port ${ iAppPort }` ); // eslint-disable-line no-console
    } );
}
