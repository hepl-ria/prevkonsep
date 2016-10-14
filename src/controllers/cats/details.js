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

 	db.collection( "cats" )
 		.find( {
 			"slug": slugify( oRequest.params.slug ),
 		} )
 		.then( ( oCat ) => {
 			if( oCat ) {
 				return oResponse.json( oCat );
 			}
 			oResponse.sendStatus( 404 );
 		} )
 		.catch( ( oError ) => {
 			oResponse.status( 500 ).json( {
 				"errors": [ oError ],
 			} );
 		} )
 }