import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "parrots" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oParrots ) => {
            if ( oParrots ) {
                return oResponse.json( oParrots );
            }
            oResponse.sendStatus( 404 );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}
