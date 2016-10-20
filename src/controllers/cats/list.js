/* prevkonsep
 *
 * /src/controllers/cats/list.js - API controller for cats listing
 *
 * coded by Anne
 * started at 7/10/2016
 */

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "cats" )
        .find( {} ) // on ne filtre rien on retourne tous les chats
        /* find retourne ce qu'on appelle un curseur */
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