/* prevkonsep
 *
 * /src/routes/add.js - API controller for cats adding
 *
 * coded by Anne
 * started at 7/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = parseInt( POST.age, 10 ),
        sGender = POST.gender,
        sBabies = ( POST.babies || "No babies yet" ).trim(),
        sHome = ( POST.home || "" ),
        aErrors = [],
        sSlug,
        oCat;

    // Error managment
        // Name
    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }
        // Age
    if ( isNaN( iAge ) ) {
        aErrors.push( "age isn't a number!" );
    }
        // Gender
    if ( GENDERS.indexOf( sGender ) === -1 ) {
        aErrors.push( `invalid gender: must be "male" or "female"!` );
    }
        // Color
    if ( !sHome ) {
        aErrors.push( "home property cannot be empty!" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    sSlug = slugify( sName );

    db.collection( "red-pandas" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oCatFromDB ) => {
            if ( oCatFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A red panda with the name "${ sName }" already exists!` ],
                } );
            }

            oCat = {
                "slug": sSlug,
                "name": sName,
                "age": Math.abs( iAge ),
                "gender": sGender,
                "babies": sBabies,
                "home": sHome,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "red-pandas" )
                .insertOne( oPanda )
                    .then( () => {
                        oResponse.status( 201 ).json( oPanda );
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