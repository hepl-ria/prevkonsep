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
import zouti from "zouti";
import simpleLog from "./middlewares/log";
import mainRoutes from "../routes/main";
import catsRoutes from "../routes/cats";

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
    oApp.use( catsRoutes );

    // listening
    oApp.listen( iAppPort, () => {
        zouti.log( `Server is listeninng on port ${ APP_PORT }`, "quentin/prevkonsep" );
    } );

}
