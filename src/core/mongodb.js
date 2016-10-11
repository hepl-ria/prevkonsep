/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/	

import { MongoClient } from "mongodb";
import Promise from "bluebird";
import zouti from "zouti";
const MONGO_URL = "mongodb://127.0.0.1:27017/cats" //Si la bd n'existe pas il la crée

let oDb; //Memorise la connexion a la db avec 

export default function(  ) {
	return new Promise( ( fResolve, fReject ) ) => {
		MongoClient.connect( MONGO_URL, ( oError, oDBLink ) ) => {
			if ( oError ){
				return fReject( oError ); // SI erreur lors de la connexion
			}
			zouti.log("Connected to db.")
			fResolve( oDB = oDBLink );
		} );
	} );
}

export {
	oDB as db;
};