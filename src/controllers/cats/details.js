/* ria/prevkonsep
 * 
 * /src/controllers/cats/details.js - Controllers for one cat details
 *
 * Coded by - Paulineviroux
 * started at 14/10/2016
*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "cats" )
        .findOne( { 
            "slug" : slugify( oRequest.params.slug ),
        } )
        .then( ( oCat ) => {
            if ( oCat ) {
                return oResponse.json( oCat );
            }
            return oResponse.sendStatus( 404 );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}