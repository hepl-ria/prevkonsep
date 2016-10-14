/* leny/prevkonsep
 *
 * /src/controllers/cats/add.js - API Controller for cats adding
 *
 * coded by leny@flatLand!
 * started at 07/10/2016
 */

import { db } from "../../core/mongodb";

const GENDERS = [ "male", "female" ];

export default function( oRequest, oResponse ) {
    const POST = oRequest.body;

    let sName = ( POST.name || "" ).trim(),
        iAge = +POST.age,
        sGender = POST.gender,
        sColor = ( POST.color || "" ).trim(),
        aErrors = [],
        oCat;

    if ( !sName ) {
        aErrors.push( "name can't be empty!" );
    }

    if ( isNaN( iAge ) ) {
        aErrors.push( "age isn't a Number!" );
    }

    if ( GENDERS.indexOf( sGender ) === -1 ) {
        aErrors.push( `invalid gender: must be "male" or "female"!` );
    }

    if ( !sColor ) {
        aErrors.push( "color can't be empty!" );
    }

    if ( aErrors.length ) {
        return oResponse.status( 400 ).json( {
            "errors": aErrors,
        } );
    }

    db.collection( "cats" )
        .findOne( {
            "name": sName,
        } )
        .then( ( oCatFromDB ) => {
            if ( oCatFromDB ) {
                return oResponse.status( 409 ).json( {
                    "errors": [ `A cat with the name "${ sName }" already exists!` ],
                } );
            }

            oCat = {
                "name": sName,
                "age": Math.abs( iAge ),
                "gender": sGender,
                "color": sColor,
                "create": new Date(),
                "update": new Date(),
            };

            db.collection( "cats" )
                .insertOne( oCat )
                    .then( () => {
                        oResponse.status( 201 ).json( oCat );
                    } )
                    .catch( ( oError ) => {
                        oResponse.status( 500 ).json( {
                            "errors": [ oError ],
                        } );
                    } );
        } )
        .catch( ( oError ) => {
            oResponse.status( 500 ).json( {
                "errors": [ oError ],
            } );
        } );
}
