/* leny/prevkonsep
 *
 * /src/server.js - Main entry point
 *
 * coded by leny@flatLand!
 * started at 30/09/2016
 */

import initServer from "./core/express";
import initDB from "./core/mongodb";

console.log();
console.log( "Starting..." );

initDB()
    .then( () => {
        initServer( 12345 );
    } )
    .catch( ( oError ) => {
        console.error( oError );
    } );
