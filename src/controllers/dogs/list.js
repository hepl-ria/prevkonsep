/* ria/prevkonsep
 *
 * /src/controllers/dogs/list.js - Controller to list all the dogs
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 14/10/2016
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
