/* ria/prevkonsep
 * 
 * /src/controllers/fishes/destroy.js - Controllers for fish deletation
 *
 * Coded by - Paulineviroux
 * started at 07/10/2016
*/
import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "fishes" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oFish ) => {
            if ( !oFish ) {
                return oResponse.sendStatus( 404 );
            }
            db.collection( "fishes" )
                .deleteOne( {
                    "_id": oFish._id,
                } )
                .then( ( { deletedCount } ) => {
                    if ( deletedCount === 1 ) {
                        return oResponse.sendStatus( 204 );
                    }
                    return oResponse.status( 500 ).json( {
                        "errors": [ "Unknown deletation error" ],
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