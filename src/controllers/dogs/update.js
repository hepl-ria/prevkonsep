/* ria/prevkonsep
 *
 * /src/controllers/dogs/update.js - Controller to update a dog
 *
 * Coded by Mucht - Mathieu Claessens
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

            const POST = oRequest.body,
                GENDERS = [ "male", "female" ];

            let iAge = +POST.age,
                sGender = POST.gender,
                sRace = ( POST.race || "" ).trim(),
                oModifications = {};

            if ( !isNaN( iAge ) && iAge !== oDog.age ) {
                oDog.age = iAge;
                oModifications.age = iAge;
            }
            if ( GENDERS.indexOf( sGender ) > -1 && sGender !== oDog.gender ) {
                oDog.gender = sGender;
                oModifications.gender = sGender;
            }
            if ( sRace !== "" && sRace !== oDog.race ) {
                oDog.race = sRace;
                oModifications.race = sRace;
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
