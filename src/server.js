

/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/

import initServer from "./core/express"; //On peut déclarer le nom de l'import comme on veut 
import initDB from "./core/mongodb";
import zouti from "zouti";

zouti.spacer( 2 );
zouti.log( "Starting...", "leny/prevkonsep" );

initDB()
	.then( () => {
		initServer(12345);
	})
	.catch( (oError ) => {
		zouti.errror( oError, "leny/prevkonsep" );
	} );