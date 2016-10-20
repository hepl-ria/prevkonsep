/* prevkonsep
 *
 * /src/routes/add.js - API controller for red pandas adding
 *
 * coded by Anne
 * started at 18/10/2016
 */

import { db } from "../../core/mongodb";
import { slugify } from "../../core/utils";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = parseInt( POST.age, 10 ),
        sGender = POST.gender,
        sBabies = ( POST.babies || "" ).trim(),
        sHome = ( POST.home || "" ),
        aErrors = [],
        sSlug,
        oPanda;

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

    db.collection( "pandas" )
        .findOne( {
            "slug": sSlug,
        } )
        .then( ( oPandaFromDB ) => {
            if ( oPandaFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A red panda with the name "${ sName }" already exists!` ],
                } );
            }

            oPanda = {
                "slug": sSlug,
                "name": sName,
                "age": Math.abs( iAge ),
                "gender": sGender,
                "babies": sBabies,
                "home": sHome,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "pandas" )
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