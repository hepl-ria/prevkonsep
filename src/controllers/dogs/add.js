/* ria/prevkonsep
 *
 * /src/controllers/dogs/add.js - Controller to add a dog
 *
 * Coded by Mucht - Mathieu Claessens
 * started at 14/10/2016
*/

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "female", "male", "Unknown" ];

export default function( oRequest, oResponse ) {

    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = +POST.age, // = parseInt( POST.age, 10 )
        sGender = POST.gender,
        sRace = ( POST.race || "" ).trim(),
        sOwner = ( POST.owner || "Unknown" ).trim(),
        aErrors = [],
        oDog;

    if ( !sName ) {
        aErrors.push( "You must enter a name!" );
    }

    if ( isNaN( iAge ) ) {
        aErrors.push( "age must be a number!" );
    }
        // Gender
    if ( GENDERS.indexOf( sGender ) === -1 ) {
        aErrors.push( `invalid gender: must be "male", "female" or "Unknown"!` );
    }
        // Color
    if ( !sRace ) {
        aErrors.push( "You must enter a race!" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    db.collection( "dogs" )
        .findOne( {
            "slug": slugify( sName ),
        } )
        .then( ( oDogFromDB ) => {
            if ( oDogFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A Dog with the name "${ sName }" already exists!` ],
                } );
            }

            oDog = {
                "slug": slugify( sName ),
                "name": sName,
                "age": Math.abs( iAge ),
                "gender": sGender,
                "race": sRace,
                "owner": sOwner,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "dogs" )
                .insertOne( oDog )
                    .then( () => {
                        oResponse.status( 201 ).json( oDog );
                    } )
                    .catch( ( oError ) => {
                        oResponse.status( 500 ).json( {
                            "errors": [ oError ],
                        } );
                    } );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError.toString() ],
            } );
        } );
}
