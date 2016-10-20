/*
* 
* /src/controllers/fishes/list.js -  API Controller fishes listing
*
*/

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "fishes" )
        .find( {} )
        .toArray()
            .then( ( aFishes = [] ) => {
                oResponse.json( aFishes );
            } ) //si ca fonctionne
            .catch( ( oError ) => { // si on a une erreur
                oResponse.status( 500 ).json( {
                    "errors": [ oError.toString() ],
                } );
            } ); 
}