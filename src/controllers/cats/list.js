/* leny/prevkonsep
 *
 * /src/controllers/cats/list.js - API Controller for cats listing
 *
 * coded by leny@flatLand!
 * started at 07/10/2016
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
