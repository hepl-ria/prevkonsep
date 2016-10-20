/* quentin/prevkonsep
 *
 * /src/controllers/alpagas/destroy.js - Controllers for alpagas deletion
 *
 * coded by quentin
 * started at 20/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

export default function( oRequest, oResponse ) {
    db.collection( "alpagas" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oAlpaga ) => {
            if ( !oAlpaga ) {
                return oResponse.sendStatus( 404 );
            }

            db.collection( "alpagas" )
                .deleteOne( {
                    "_id": oAlpaga._id,
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
