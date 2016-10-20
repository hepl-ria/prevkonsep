/* ria/prevkonsep
 * 
 * /src/core/utils.js - sMALL & MISC UTIITIES
 *
 * Coded by - Paulineviroux
 * started at 07/10/2016
*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = ["male", "female"];
const WATERS = [ "sweet", "salty" ];

export default function( oRequest, oResponse ) {
    db.collection( "fishes" )
        .findOne( {
            "slug": slugify( oRequest.params.slug ),
        } )
        .then( ( oFish ) => {
            if ( !oFish ) {
                return oResponse.sendStatus( 404 );
            }

            const POST = oRequest.body;

            let iAge = +POST.age,
                sGender = POST.gender,
                sWater = POST.water,
                sColor = ( POST.color || "" ).trim(),
                oModifications = {};

            if ( !isNaN( iAge ) ) {
                oModifications.age = iAge;
            }

            if ( GENDERS.indexOf( sGender ) > -1 && sGender !== oFish.gender ) {
                oModifications.gender = sGender;
            }

            if ( WATERS.indexOf( sWater ) > -1 && sWater !== oFish.water ) {
                oModifications.water = sWater;
            }

            if ( !sColor !== "" && sColor !== oFish.color ) {
                oModifications.color = sColor;
            }

            if ( Object.keys( oModifications ).length === 0 ) {
                return oResponse.sendStatus( 204 );
            }

            oModifications.update = new Date();


            db.collection( "fishes" )
                .updateOne( {
                    "_id": oFish._id,
                } , {
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