import { db } from "../../core/mongodb";

export default function ( oRequest, oResponse ) {
    db.collection( "cats" )
        .find( {} ) // Retourne tous les chats
        .toArray()
            .then( ( aCats = [] ) => {
                oResponse.json( aCats );
            })
            .catch( ( oError ) => {
                oResponse.status(500).json( {
                    "errors": [ oError ],
                } );
            } );

}