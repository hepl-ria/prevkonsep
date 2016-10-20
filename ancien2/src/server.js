/* leny/prevkonsep
 *
 * /src/server.js - Main entry point
 *
 * coded by leny@flatLand!
 * started at 30/09/2016
 */

import initServer from "./core/express.js";
import initDB from "./core/mongodb";
import zouti from "zouti";

zouti.spacer(2);
zouti.log("Starting…", "jimmy/prevkonsep")

initDB()
    .then( ()  => {
        initServer( 12345 );
    })
    .catch( ( oError ) => {
        zouti.error( oError, "jimmy/prevkonsep" );
} );
