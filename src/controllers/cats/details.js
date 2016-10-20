/* Chris Jend - 30/09/2016 
	Server.js - prevkonsep*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function(oRequest, oResponse ) {
	db.collection( "cats" )
		.findOne( {
			"slug": slugify( oRequest.params.slug ),
		})
		.then( ( oCat ) => {
			if ( oCat  ){
				return oResponse.json( oCat );
			}
			oResponse.sendStatus( 400 );
		})
		.catch( (oError ) =>{
			oResponse.status( 500 ).json( {
				"errors": [ oError.toString() ],
			});
		});
}