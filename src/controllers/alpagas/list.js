/* quentin/prevkonsep
 *
 * /src/controllers/alpagas/list.js - API Controller for alpagas listing
 *
 * coded by quentin
 * started at 20/10/2016
 */

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "alpagas" )
        .find( {} )
        .toArray()
            .then( ( aAlpagas = [] ) => {
                oResponse.json( aAlpagas );
            } )
            .catch( ( oError ) => {
                oResponse.status( 500 ).json( {
                    "errors": [ oError.toString() ],
                } );
            } );
}
