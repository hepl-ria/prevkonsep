/*
*
* /src/server.js - Main entry point
*
*/

import initServer from "./core/express";
import initDB from "./core/mongodb";
import zouti from "zouti";

zouti.spacer( 2 );
zouti.log( "Starting...", "pauline/prevkonsep" );

initDB()
    .then( ( ) => {
        initServer( 12345 );
    })
    .catch( ( oError ) => { // appelé si mon code génère une erreur
        zouti.error( oError, "pauline/prevkonsep" ); 
    });

