import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "parrots" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oParrot ) => {
            if ( !oParrot ) {
                return oResponse.sendStatus( 404 );
            }

            db.collection( "parrots" )
                .deleteOne( {
                    "_id": oParrot._id,
                } )
                .then( ( { deletedCount } ) => {
                    if ( deletedCount === 1 ) {
                        return oResponse.sendStatus( 204 );
                    }
                    oResponse.status( 500 ).json( {
                        "errors": [ "Unknown deletion error" ],
                    } );
                } )
                .catch( ( oError ) => {
                    oResponse.status( 500 ).json( {
                        "errors": [ oError.toString() ],
                    } );
                } );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}
