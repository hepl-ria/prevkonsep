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
import mainRoutes from "../routes/main";
import zouti from "zouti";
import catsRoutes from "../routes/cats";


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

    // configure routes
    oApp.use( mainRoutes );
    oApp.use( catsRoutes );

    // listening
    oApp.listen( iAppPort, () => {
        zouti.log( `server is listening on port ${ iAppPort }`, "Mucht/prevkonsep" ); // eslint-disable-line no-console
    } );

}
