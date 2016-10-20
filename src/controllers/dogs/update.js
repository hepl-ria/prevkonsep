/* auré/prevkonsep
 *
 * /src/controllers/dogs/update.js - Controllers to update dog
 *
 * coded by auré
 * started at 14/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const CHIP = [ "yes", "no" ];

export default function( oRequest, oResponse ) {
    db.collection( "dogs" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oDog ) => {
            if ( !oDog ) {
                return oResponse.sendStatus( 404 );
            }

            const POST = oRequest.body;

            let iAge = +POST.age,
                sChip = POST.chip,
                iPawsNumber = +POST.pawsNumber,
                oModifications = {};

            // facultative
            if ( !isNaN( iAge ) && iAge !== oDog.age ) {
                oModifications.age = iAge;
                return null;
            }

            if ( CHIP.indexOf( sChip ) > -1 && sChip !== oDog.chip ) {
                oModifications.chip = sChip;
            }

            if(!isNaN(iPawsNumber)){
                oDog.pawsNumber = iPawsNumber;
                oModifications.pawsNumber = iPawsNumber;
            }

            if ( Object.keys( oModifications ).length === 0 ) {
                return oResponse.sendStatus( 204 );
            }

            oModifications.update = new Date();

            db.collection( "dogs" )
                .updateOne( {
                    "_id": oDog._id,
                }, {
                    "$set": oModifications,
                } )
                .then( ( { matchedCount, modifiedCount } ) => {
                    if ( matchedCount !== 1 || modifiedCount !== 1 ) {
                        return oResponse.status( 500 ).json( {
                            "errors": [ "Unknown update error" ],
                        } );
                    }

                    oResponse.sendStatus( 204 );
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