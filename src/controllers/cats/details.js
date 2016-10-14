/* prevkonsep
 *
 * /src/controllers/details.js - Controllers
 *
 * coded by Anne
 * started at 14/10/2016
 */

 import { db } from "../../core/mongodb";

 export default function( oRequest, oResponse ) {
 	let sName = oRequest.params.name;

 	db.collection( "cats" )
 		.find( {
 			"name": sName,
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