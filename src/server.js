/* quentin/prevkonsep
 *
 * /src/server.js - Main entry point
 *
 * coded by quentin
 * started at 30/09/2016
 */

import initServer from "./core/express"; // avec es2015 on peut donner directement le nom ici "initServer"
import initDB from "./core/mongodb";
import zouti from "zouti";

zouti.spacer( 2 );
zouti.log( "Starting...", "quentin/prevkonsep" );

initDB()
    .then( () => {
        initServer( 12345 );
    } )
    .catch( ( oError ) => {
        zouti.error( oError, "quentin/prevkonsep" );
    } );
