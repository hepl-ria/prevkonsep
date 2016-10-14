/* ria/prevkonsep
 *
 * /src/controllers/cats/list.js - API Controller for cats listing
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 07/10/2017
*/

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "cats" )
        .find( {} )
        .toArray()
            .then( ( aCats = [] ) => {
                oResponse.json( aCats );
            } )
            .catch( ( oError ) => {
                oResponse.status( 500 ).json( {
                    "errors": [ oError.toString() ],
                } );
            } );
}
