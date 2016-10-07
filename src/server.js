/* ria/prevkonsep
 *
 * /server.js - Main entry point
 *
 * Coded by mucht@mathieuclaessens.be
 * started at 30/09/2016
*/

import initServer from "./core/express";
import initDB from "./core/mongodb";
import zouti from "zouti";

zouti.spacer( 2 );
zouti.log( "Starting...", "Mucht/prevkonsep" );

initDB()
    .then( () => {
        initServer( 12345 );
    } )
    .catch( ( oError ) => {
        zouti.error( oError, "Mucht/prevkonsep" );
    } );
