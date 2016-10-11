/* Chris Jend - 30/092016 
	Server.js - prevkonsep*/

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ){ // SI pas de db lui la créera
	db.collection( "cats" )
		.find( {} ) //Ne retourne rien, liste tous les chats
		.toArray()
			.then( ( aCats = [] ) => {
				oResponse.json( aCats );
			})
			.catch( ( oError ) => {
				oResponse.status( 500 ).json( {
					"errors": [ oError ],
				} );
			} );
	
}