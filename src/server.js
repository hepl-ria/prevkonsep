import initServer from "./core/express";
import initDB from "./core/mongodb";
import zouti from "zouti";

zouti.spacer( 2 );
zouti.log( "Starting...", "jimmy/prevkonsep" );

initDB()
    .then( () => {
        initServer( 12345 );
    } )
    .catch( ( oError ) => {
        zouti.error( oError, "jimmy/prevkonsep" );
    } );
