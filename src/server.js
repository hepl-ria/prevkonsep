

/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/

import initServer from "./core/express"; //On peut déclarer le nom de l'import comme on veut 
import initDB from "./core/mongodb";

console.log();
console.log( "Starting...");

initDB()
	.then( () => {
		initServer(12345);
	})
	.catch( (oError ) => {
		console.errror( oError );
	} );