/* ria/prevkonsep
 * 
 * /src/controllers/fishes/details.js - Controllers for one fish details
 *
 * Coded by - Paulineviroux
 * started at 14/10/2016
*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "fishes" )
        .findOne( { 
            "slug" : slugify( oRequest.params.slug ),
        } )
        .then( ( oFish ) => {
            if ( oFish ) {
                return oResponse.json( oFish );
            }
            return oResponse.sendStatus( 404 );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}