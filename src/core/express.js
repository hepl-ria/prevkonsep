import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
import zouti from "zouti";
import simpleLog from "./middlewares/log";
import mainRoutes from "../routes/main";
import catsRoutes from "../routes/parrots";
import parrotsRoutes from "../routes/parrots";

const APP_PORT = 8080;

let oApp;

export default function( iAppPort = APP_PORT ) {

    if ( oApp ) {
        return oApp;
    }

    oApp = express();
    oApp.use( simpleLog );
    oApp.use( responseTime() );
    oApp.use( bodyParser.json() );
    oApp.use( bodyParser.urlencoded( {
        "extended": true,
    } ) );

    oApp.use( mainRoutes );
    oApp.use( catsRoutes );
    oApp.use( parrotsRoutes );

    oApp.listen( iAppPort, () => {
        zouti.log( `Server is listening  on port ${ iAppPort }`, "jimmy/prevkonsep" );
    } );
}
