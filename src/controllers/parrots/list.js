import { db } from "../../core/mongodb";

export default function( oRequest, oResponse ) {
    db.collection( "parrots" )
        .find( {} )
        .toArray()
        .then( ( aParrots = [] ) => {
            oResponse.json( aParrots );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}
