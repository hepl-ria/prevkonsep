/* ria/prevkonsep
 *
 * /src/controllers/cats/details.js - Controllers for one Cat details
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 14/10/2016
*/

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    let sSlug = oRequest.params.slug.toLowerCase().replace( /\s/g, "-" );

    db.collection( "cats" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oCat ) => {
            if ( oCat ) {
                return oResponse.json( oCat );
            }

            return oResponse.sendStatus( 404 );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError ],
            } );
        } );
}
