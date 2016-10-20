/* Chris Jend - 30/09/2016 
	Server.js - prevkonsep*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse) {
	db.collection( "ferrets" )
		.findOne( {
			"slug": slugify( oRequest.params.slug ),
		})
		.then( ( oferret ) => {
			if ( oFerret ) {
				return oResponse.json( oFerret );
			}
			oResponse.sendStatus( 404 );
		})
		.catch( ( oError ) => {
			oResponse.status( 500 ).json( {
				"errors": [ oError.toString() ],
			});
		});
}