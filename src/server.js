/* quentin/prevkonsep
 *
 * /src/server.js - Main entry point
 *
 * coded by quentin
 * started at 30/09/2016
 */

import initServer from "./core/express"; // avec es2015 on peut donner directement le nom ici "initServer"
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
