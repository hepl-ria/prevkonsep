/* ria/prevkonsep
 *
 * /src/controllers/dogs/details.js - Controller to get a dog's details
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 14/10/2016
*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {

    db.collection( "dogs" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oDog ) => {
            if ( oDog ) {
                return oResponse.json( oDog );
            }

            return oResponse.sendStatus( 404 );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}
