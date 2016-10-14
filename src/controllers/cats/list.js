/*
* 
* /src/controllers/cats/list.js -  API Controller cats listing
*
*/

import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "cats" )
        .find( {} )
        .toArray()
            .then( ( aCats = [] ) => {
                oResponse.json( aCats );
            } ) //si ca fonctionne
            .catch( ( oError ) => { // si on a une erreur
                oResponse.status( 500 ).json( {
                    "errors": [ oError.toString() ],
                } );
            } ); 
}