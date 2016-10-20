/* auré/prevkonsep
 *
 * /src/controllers/dogs/destroy.js - Controllers for dogs deletion
 *
 * coded by auré
 * started at 14/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "dogs" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oDog ) => {
            if ( !oDog ) {
                return oResponse.sendStatus( 404 );
            }

            db.collection( "dogs" )
                .deleteOne( {
                    "_id": oDog._id,
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