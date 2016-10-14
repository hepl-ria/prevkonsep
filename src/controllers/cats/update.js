/* leny/prevkonsep
 *
 * /src/controllers/cats/update.js - Controllers to update Cat
 *
 * coded by leny@flatLand!
 * started at 14/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    db.collection( "cats" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oCat ) => {
            if ( !oCat ) {
                return oResponse.sendStatus( 404 );
            }

            const POST = oRequest.body;

            let iAge = +POST.age,
                sGender = POST.gender,
                sColor = ( POST.color || "" ).trim(),
                oModifications = {};

            if ( !isNaN( iAge ) && iAge !== oCat.age ) {
                oModifications.age = iAge;
            }

            if ( GENDERS.indexOf( sGender ) > -1 && sGender !== oCat.gender ) {
                oModifications.gender = sGender;
            }

            if ( sColor !== "" && sColor !== oCat.color ) {
                oModifications.color = sColor;
            }

            if ( Object.keys( oModifications ).length === 0 ) {
                return oResponse.sendStatus( 204 );
            }

            oModifications.update = new Date();

            db.collection( "cats" )
                .updateOne( {
                    "_id": oCat._id,
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
