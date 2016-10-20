
/* auré/prevkonsep
 *
 * /src/controllers/dogs/list.js - API Controller for dogs listing
 *
 * coded by auré
 * started at 07/10/2016
 */

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "dogs" )
        .find( {} )
        .toArray()
            .then( ( aDogs = [] ) => {
                oResponse.json( aDogs );
            } )
            .catch( ( oError ) => {
                oResponse.status( 500 ).json( {
                    "errors": [ oError.toString() ],
                } );
            } );
}