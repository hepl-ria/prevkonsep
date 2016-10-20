/* quentin/prevkonsep
 *
 * /src/controllers/alpagas/details.js - Controllers for one alpagas details
 *
 * coded by quentin
 * started at 20/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "alpagas" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oAlpaga ) => {
            if ( oAlpaga ) {
                return oResponse.json( oAlpaga );
            }
            oResponse.sendStatus( 404 );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}
