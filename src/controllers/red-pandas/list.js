/* prevkonsep
 *
 * /src/controllers/red-pandas/list.js - API controller for red-pandas listing
 *
 * coded by Anne
 * started at 7/10/2016
 */

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "red-pandas" )
        .find( {} )
        .toArray()
            .then( ( aPandas = [] ) => {
                oResponse.json( aPandas );
            } )
            .catch( ( oError ) => {
                oResponse.status( 500 ).json( {
                    "errors": [ oError.toString() ],
                } );
            } );
}