/* prevkonsep
 *
 * /src/controllers/details.js - Controllers
 *
 * coded by Anne
 * started at 14/10/2016
 */

 import { db } from "../../core/mongodb";
 import { slugify } from "../../core/utils";

 export default function( oRequest, oResponse ) {

 	db.collection( "pandas" )
 		.findOne( {
 			"slug": slugify( oRequest.params.slug ),
 		} )
 		.then( ( oPanda ) => {
 			if( oPanda ) {
 				return oResponse.json( oPanda );
 			}
 			oResponse.sendStatus( 404 );
 		} )
 		.catch( ( oError ) => {
 			oResponse.status( 500 ).json( {
 				"errors": [ oError.toString() ],
 			} );
 		} )
 }