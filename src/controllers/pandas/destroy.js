/* prevkonsep
 *
 * /src/controllers/cats/destroy.js - Controllers for red pandas deletion
 *
 * coded by Anne
 * started at 18/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
	db.collection( "pandas" )
		.findOne( {
			"slug": slugify( oRequest.params.slug ),
		} )
		.then( ( oPanda ) => {
			if ( !oPanda ) {
				return oResponse.sendStatus( 404 );
			}

			db.collection( "pandas" )
				.deleteOne( {
					"_id": oPanda._id,
				} )
				.then( ( { deletedCount } ) => {
					if ( deletedCount === 1 ) {
						return oResponse.sendStatus( 204 )
					}
					return oResponse.status( 500 ).json( {
						"errors": [ "Unknown deletion error" ],
					} );
				} )
				.catch( ( oError ) => {
		            oResponse.status( 500 ).json( {
		                "errors": [ oError.toString() ],
		            } );
		        } );
		} )
		.catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}