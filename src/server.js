/*
*
* /src/server.js - Main entry point
*
*/

import initServer from "./core/express";
import initDB from "./core/mongodb";

console.log();
console.log( "Starting..." );

initDB()
    .then( ( ) => {
        initServer( 12345 );
    })
    .catch( ( oError ) => { // appelé si mon code génère une erreur
        console.error( oError ); 
    });

