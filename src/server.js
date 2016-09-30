

import express from "express";
import responseTime from "response-time";
import bodyParser from "body-parser";
const APP_PORT = 8080;
let oApp;

oApp = express();

oApp.use( responseTime() );
oApp.use( bodyParser.json() );
oApp.use( bodyParser.urlencoded( {
    "extended": true,
} ) );

oApp.get( "/", ( oRequest, oResponse ) => {
    oResponse.send( "Hello, world!" );
} );

oApp.listen( APP_PORT, () => {
    console.log( `Server is listening  on port ${ APP_PORT }` ); // eslint-disable-line no-console
} );
